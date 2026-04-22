package com.ecommerce.common.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
@Service
public class AIService {

    private final WebClient webClient;

    
    private String apiKey;

    public AIService(@Value("${GEMINI_API_KEY}") String apiKey) {
        this.webClient = WebClient.create("https://generativelanguage.googleapis.com");
        this.apiKey=apiKey;
        System.out.println("API KEY : " + apiKey);
    }

    public String askAI(String prompt) {

    try {
        String requestBody = """
        {
          "contents": [{
            "parts":[{"text":"%s"}]
          }]
        }
        """.formatted(prompt);

        JsonNode json = webClient.post()
                .uri("/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();

        // 🔥 LOG EVERYTHING
        System.out.println("FULL RESPONSE: " + json);

        if (json == null) return "No response from AI";

        if (json.has("candidates")) {
            return json
                    .get("candidates")
                    .get(0)
                    .get("content")
                    .get("parts")
                    .get(0)
                    .get("text")
                    .asText();
        }

        if (json.has("error")) {
            return "Gemini Error: " + json.get("error").toString();
        }

        return "Unexpected response: " + json.toString();

    } catch (Exception e) {
        e.printStackTrace(); // 🔥 THIS IS CRITICAL
        return "Internal Error: " + e.getMessage();
    }
}
}