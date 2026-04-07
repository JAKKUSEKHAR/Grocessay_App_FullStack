package com.ecommerce.product.entity;

import com.ecommerce.category.entity.Category;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private double price;

    private int quantity;

    private boolean active = true;
   
    private String imageName;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    
}
