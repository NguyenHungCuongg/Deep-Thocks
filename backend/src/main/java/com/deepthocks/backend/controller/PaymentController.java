package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.PaymentRequestDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @PostMapping("/vnpay")
    public ResponseEntity<?> createVnpayPayment(@RequestBody PaymentRequestDTO paymentDTO, HttpServletRequest request) {
        String vnp_TmnCode = "0JATDUNQ";
        String vnp_HashSecret = "JR6SU3Q6T85SGBCY00CHJ9A54Z1ICO24";
        String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String vnp_ReturnUrl = "http://localhost:5173/payment/vnpay-return";

        // Random số cho TxnRef (8 số)
        String vnp_TxnRef = String.valueOf(10000000 + new Random().nextInt(90000000));
        // Lấy IP
        String ipAddr = request.getRemoteAddr();
        if ("0:0:0:0:0:0:0:1".equals(ipAddr)) {
            ipAddr = "127.0.0.1";
        }

        // Tạo ngày giờ tạo và hết hạn
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf((long)(paymentDTO.getAmount() * 100)));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang #" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", ipAddr);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Sắp xếp tham số theo thứ tự alphabet
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String value = vnp_Params.get(fieldName);
            if (value != null && value.length() > 0) {
                // hashData: encode cả key và value bằng US-ASCII
                hashData.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                hashData.append('=');
                hashData.append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                // query: encode cả key và value bằng US-ASCII
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

        Map<String, Object> result = new HashMap<>();
        result.put("code", "00");
        result.put("message", "success");
        result.put("data", paymentUrl);

        return ResponseEntity.ok(result);
    }

    // Hàm tạo chữ ký HMAC SHA512
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
}
