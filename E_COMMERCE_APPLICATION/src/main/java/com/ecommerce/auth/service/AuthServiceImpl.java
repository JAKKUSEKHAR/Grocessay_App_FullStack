package com.ecommerce.auth.service;

import com.ecommerce.auth.dto.AuthResponse;
import com.ecommerce.auth.dto.LoginRequest;
import com.ecommerce.auth.dto.RegisterRequest;
import com.ecommerce.user.entity.User;
import com.ecommerce.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Override
    public void register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPassword(request.getPassword());
        user.setRole("USER");

        userRepository.save(user);
    }

//    @Override
//    public void login(LoginRequest request) {
//
//        User user = userRepository.findByUsername(request.getUsername())
//                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
//
////        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
////            throw new RuntimeException("Invalid credentials");
////        }
//        if (!request.getPassword().equals(user.getPassword())) {
//            throw new RuntimeException("Invalid credentials");
//        }
//    }
    
    @Autowired
    private JwtService jwtService;

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!request.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String role = user.getRole();
        String token = null;

        //  generate token ONLY for ADMIN
        if ("ADMIN".equals(role)) {
            token = jwtService.generateToken(
                    user.getUsername(),
                    role
            );
        }

        return new AuthResponse(token, role, "Login successful",user.getId());
    }
}
