package com.ecommerce.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.dto.OrderResponse;
//import com.ecommerce.order.entity.Order;
import com.ecommerce.order.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Long> placeOrder(@RequestBody OrderRequest request) {
        Long orderId = orderService.placeOrder(request);
        return ResponseEntity.ok(orderId);
    }
    
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(
            @RequestParam Long userId) {

        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }
    
}
