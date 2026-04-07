package com.ecommerce.order.service;

import java.util.List;

import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.dto.OrderResponse;
//import com.ecommerce.order.entity.Order;

public interface OrderService {
   public Long placeOrder(OrderRequest request);
   List<OrderResponse> getOrdersByUser(Long userId);

}

