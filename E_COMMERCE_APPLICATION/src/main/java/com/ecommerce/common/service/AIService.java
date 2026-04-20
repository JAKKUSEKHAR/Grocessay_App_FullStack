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

    String requestBody = """
    {
      "contents": [{
        "parts":[{"text":"%s"}]
      }]
    }
    """.formatted(prompt);

    return webClient.post()
            .uri("/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey)
            .header("Content-Type", "application/json")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(JsonNode.class)
            .map(json -> {

                // 🔥 IMPORTANT: log full response
                System.out.println("FULL GEMINI RESPONSE: " + json);

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
                    return "Gemini API Error: " + json.get("error").toString();
                }

                return "Unexpected response: " + json.toString();
            })
            .block();
}
}