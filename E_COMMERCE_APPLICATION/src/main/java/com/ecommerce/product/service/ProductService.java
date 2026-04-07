package com.ecommerce.product.service;

import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    List<ProductResponse> getAllProducts();
    
    ProductResponse update(Long id, ProductRequest request); // for update product
 
    void delete(Long id);  // for delete product
    ProductResponse getById(Long id);
}
