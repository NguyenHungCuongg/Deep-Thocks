package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.PaymentRequestDTO;
import com.deepthocks.backend.entity.Order;
import com.deepthocks.backend.entity.PaymentTransaction;
import com.deepthocks.backend.repository.OrderRepository;
import com.deepthocks.backend.repository.PaymentTransactionRepository;
import com.deepthocks.backend.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    private OrderService orderService;

    @PostMapping("/vnpay")
    public ResponseEntity<?> createVnpayPayment(@RequestBody PaymentRequestDTO paymentDTO, HttpServletRequest request) {
        String vnp_TmnCode = "0JATDUNQ";
        String vnp_HashSecret = "JR6SU3Q6T85SGBCY00CHJ9A54Z1ICO24";
        String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String vnp_ReturnUrl = "http://localhost:5173/payment/vnpay-return";

        if (paymentDTO.getOrderId() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Thiếu orderId để khởi tạo giao dịch thanh toán."));
        }

        Order order = orderRepository.findById(paymentDTO.getOrderId()).orElse(null);
        if (order == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Không tìm thấy đơn hàng cần thanh toán."));
        }
        if (!"vnpay".equalsIgnoreCase(order.getPaymentMethod())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Đơn hàng này không sử dụng phương thức thanh toán VNPay."));
        }
        if ("paid".equalsIgnoreCase(order.getStatus())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Đơn hàng này đã được thanh toán."));
        }

        String vnp_TxnRef = generateTransactionRef();
        String ipAddr = request.getRemoteAddr();
        if ("0:0:0:0:0:0:0:1".equals(ipAddr)) {
            ipAddr = "127.0.0.1";
        }

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", order.getTotalAmount().multiply(BigDecimal.valueOf(100)).toBigInteger().toString());
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang #" + order.getOrderId());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", ipAddr);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String value = vnp_Params.get(fieldName);
            if (value != null && value.length() > 0) {
                hashData.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                hashData.append('=');
                hashData.append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    hashData.append('&');
                    query.append('&');
                }
            }
        }

        String vnp_SecureHash = hmacSHA512(vnp_HashSecret, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);

        String paymentUrl = vnp_Url + "?" + query.toString();

        PaymentTransaction paymentTransaction = PaymentTransaction.builder()
                .order(order)
                .provider("VNPAY")
                .transactionRef(vnp_TxnRef)
                .amount(order.getTotalAmount())
                .status("PENDING")
                .requestPayload(query.toString())
                .build();
        paymentTransactionRepository.save(paymentTransaction);

        Map<String, Object> result = new HashMap<>();
        result.put("code", "00");
        result.put("message", "success");
        result.put("data", paymentUrl);
        result.put("orderId", order.getOrderId());
        result.put("transactionRef", vnp_TxnRef);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/vnpay-return")
    public ResponseEntity<?> verifyVnpayReturn(@RequestParam Map<String, String> params) {
        String secureHash = params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");

        String transactionRef = params.get("vnp_TxnRef");
        if (transactionRef == null || transactionRef.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Thiếu mã giao dịch VNPay."));
        }

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findByTransactionRef(transactionRef).orElse(null);
        if (paymentTransaction == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Không tìm thấy giao dịch thanh toán cần đối soát."));
        }

        String computedHash = hmacSHA512("JR6SU3Q6T85SGBCY00CHJ9A54Z1ICO24", buildHashData(params));
        boolean validSignature = secureHash != null && secureHash.equalsIgnoreCase(computedHash);

        paymentTransaction.setSecureHash(secureHash);
        paymentTransaction.setGatewayTransactionId(params.get("vnp_TransactionNo"));
        paymentTransaction.setResponseCode(params.get("vnp_ResponseCode"));
        paymentTransaction.setResponsePayload(params.toString());

        if (!validSignature) {
            paymentTransaction.setStatus("INVALID_SIGNATURE");
            paymentTransactionRepository.save(paymentTransaction);
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Chữ ký VNPay không hợp lệ."));
        }

        if ("00".equals(params.get("vnp_ResponseCode"))) {
            paymentTransaction.setPaidAt(LocalDateTime.now());
            try {
                orderService.changeStatusToPaid(paymentTransaction.getOrder().getOrderId());
                paymentTransaction.setStatus("SUCCESS");
                paymentTransactionRepository.save(paymentTransaction);
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Thanh toán VNPay thành công.",
                        "orderId", paymentTransaction.getOrder().getOrderId()
                ));
            } catch (RuntimeException ex) {
                paymentTransaction.setStatus("RECONCILE_REQUIRED");
                paymentTransactionRepository.save(paymentTransaction);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", ex.getMessage(),
                        "orderId", paymentTransaction.getOrder().getOrderId()
                ));
            }
        }

        paymentTransaction.setStatus("FAILED");
        paymentTransactionRepository.save(paymentTransaction);
        return ResponseEntity.ok(Map.of(
                "success", false,
                "message", "Thanh toán VNPay thất bại.",
                "orderId", paymentTransaction.getOrder().getOrderId()
        ));
    }

    public static String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] bytes = hmac512.doFinal(data.getBytes());
            return Hex.encodeHexString(bytes);
        } catch (Exception ex) {
            return "";
        }
    }

    private String generateTransactionRef() {
        String transactionRef;
        do {
            transactionRef = String.valueOf(10000000 + new Random().nextInt(90000000));
        } while (paymentTransactionRepository.findByTransactionRef(transactionRef).isPresent());
        return transactionRef;
    }

    private String buildHashData(Map<String, String> params) {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        Iterator<String> iterator = fieldNames.iterator();
        while (iterator.hasNext()) {
            String fieldName = iterator.next();
            String value = params.get(fieldName);
            if (value != null && !value.isBlank()) {
                hashData.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                hashData.append('=');
                hashData.append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                if (iterator.hasNext()) {
                    hashData.append('&');
                }
            }
        }
        return hashData.toString();
    }
}
