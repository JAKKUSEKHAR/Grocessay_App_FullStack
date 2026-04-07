package com.ecommerce.product.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private double price;
    private int quantity;
    private Long categoryId;
    private String imageName;

}
