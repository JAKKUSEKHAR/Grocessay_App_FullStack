package com.ecommerce.product.controller;

import com.ecommerce.auth.service.JwtService;
import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.dto.ProductResponse;
import com.ecommerce.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin("*")
public class AdminProductController {

    @Autowired
    private ProductService service;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ProductResponse create(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ProductRequest request
    ) {

        // 1️⃣ Check header format
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        // 2️⃣ Extract token
        String token = authHeader.substring(7);

        // 3️⃣ Extract role from token
        String role = jwtService.extractRole(token);

        // 4️⃣ Authorize
        if (!"ADMIN".equals(role)) {
            throw new RuntimeException("Access denied: Admin only");
        }

        // Perform admin operation
        return service.create(request);
    }
 

    @PutMapping("/{id}")
    public ProductResponse update(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}