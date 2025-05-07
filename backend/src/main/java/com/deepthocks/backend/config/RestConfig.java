package com.deepthocks.backend.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {
    @Autowired
    private EntityManager entityManager;

    private String frontendURL = "http://localhost:5173";

    //Configuration để các dữ liệu JSON trả về từ REST DATA có chứa ID(nếu không config thì ID sẽ bị hidden)
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry corsRegistry) {
        //Thêm prefix /api cho tất cả endpoints
        config.setBasePath("/api");

        //Config để JSON data trả về hiển thị ID(khóa chính)
        config.exposeIdsFor(
                entityManager
                        .getMetamodel()
                        .getEntities()
                        .stream()
                        .map(Type::getJavaType)
                        .toArray(Class[]::new)
        );

        //Config CORS để bên Frontend có thể truy xuất dữ liệu từ Backend
        corsRegistry.addMapping("/**") // Cho phép tất cả các route (REST API)
                .allowedOrigins(frontendURL) // Cho phép truy cập từ frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Cho phép các HTTP method
                .allowedHeaders("*"); // Cho phép tất cả các header
    }
}
