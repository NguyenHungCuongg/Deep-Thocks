package com.deepthocks.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {
    private static final String UPLOAD_DIRECTORY = "src/main/resources/static/images/";

    @PostMapping("/images")
    public ResponseEntity<?>  uploadImage(@RequestParam("file") MultipartFile file) throws IOException { //mong đợi một tham số có tên là "file"  trong data-form được gửi từ frontend
        try{
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename(); //Sử dụng phương thức .currentTimeMillis() để thêm thời gian vào tên ảnh -> tránh trùng lặp tên ảnh
            Path uploadPath = Paths.get(UPLOAD_DIRECTORY + fileName);
            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING); //Đây là phương thức cốt lõi để lưu hình ảnh vào uploadPath

            // Trả về đường dẫn truy cập ảnh (ví dụ: /images/...) để xử lý logic "response" bên frontend
            String imageUrl = "/images/" + fileName;
            return ResponseEntity.ok(imageUrl);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

    }
}
