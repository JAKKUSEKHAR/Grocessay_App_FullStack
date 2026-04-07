package com.ecommerce.product.controller;
import com.ecommerce.product.dto.ProductRequest;
//import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.dto.ProductResponse;
import com.ecommerce.product.service.ProductService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService service;

//    @PostMapping
//    public ProductResponse create(@RequestBody ProductRequest request) {
//        return service.create(request);
//    }

    
    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return service.getAllProducts();
    }
//    @GetMapping
//    public String test() {
//        return "OK";
//    }
      
    @PutMapping("/{id}")
    public ProductResponse updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {

        return service.update(id, request);
    }
    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id) {
        return service.getById(id);
    }
}

