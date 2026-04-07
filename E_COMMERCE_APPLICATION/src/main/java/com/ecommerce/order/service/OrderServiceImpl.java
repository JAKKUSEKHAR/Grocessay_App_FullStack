package com.ecommerce.order.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.order.dto.OrderItemRequest;
import com.ecommerce.order.dto.OrderItemResponse;
import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.dto.OrderResponse;
import com.ecommerce.order.entity.Order;
import com.ecommerce.order.entity.OrderItem;
import com.ecommerce.order.repository.OrderRepository;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.repository.ProductRepository;
import com.ecommerce.user.entity.User;
import com.ecommerce.user.repository.UserRepository;

@Transactional
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Long placeOrder(OrderRequest request) {

    	System.out.println("USER ID RECEIVED: " + request.getUserId());
    	System.out.println("ITEMS RECEIVED: " + request.getItems().size());
        //  FETCH USER
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order order = new Order();
        order.setUser(user); // FIX
        order.setStatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderItemRequest req : request.getItems()) {

            Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

            // Checking the stock
            if (product.getQuantity() < req.getQuantity()) {
                throw new RuntimeException(
                    "Product out of stock: " + product.getName()
                );
            }

            // Reducing the stock
            product.setQuantity(product.getQuantity() - req.getQuantity());

            //  auto-disable product
//            if (product.getQuantity() == 0) {
//                product.setActive(false); // hide from users
//            }

            productRepository.save(product);

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setQuantity(req.getQuantity());
            item.setPrice(product.getPrice());
            item.setOrder(order);

            total += product.getPrice() * req.getQuantity();
//               if(total >100)
//               {
//            	   total = total-total*10/100;
//               }
//               if(total >200)
//               {
//            	   total = total+total*20/100;
//               }
//               if(total >300)
//               {
//            	   total = total+total*30/100;
//               }
            items.add(item);
        }

        order.setTotalAmount(total);
        order.setItems(items);

        Order saved = orderRepository.save(order);
        System.out.println("ORDER SAVED WITH ID: " + saved.getId());
        return saved.getId();
    }
    
    @Override
    public List<OrderResponse> getOrdersByUser(Long userId) {

        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream().map(order -> {
            OrderResponse res = new OrderResponse();
            res.setId(order.getId());
            res.setStatus(order.getStatus());
            res.setTotalAmount(order.getTotalAmount());
            res.setCreatedAt(order.getCreatedAt());

            List<OrderItemResponse> items = order.getItems().stream().map(item -> {
                OrderItemResponse ir = new OrderItemResponse();
                ir.setProductId(item.getProductId());
                ir.setProductName(item.getProductName());
                ir.setQuantity(item.getQuantity());
                ir.setPrice(item.getPrice());
                return ir;
            }).toList();

            res.setItems(items);
            return res;
        }).toList();
    }
    

}

