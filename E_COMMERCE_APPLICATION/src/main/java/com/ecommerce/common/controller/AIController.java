package com.ecommerce.common.controller; 

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.common.service.AIService;

@RestController
@RequestMapping("api/ai")
@CrossOrigin("*") // for React
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
        
    }

    @PostMapping("/ask")
    public String ask(@RequestBody String prompt) {
        return aiService.askAI(prompt);
    }
}