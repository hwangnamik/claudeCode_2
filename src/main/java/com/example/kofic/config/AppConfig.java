package com.example.kofic.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class AppConfig {

    @Value("${kofic.api.base-url}")
    private String baseUrl;

    @Bean
    public RestClient koficRestClient() {
        return RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }
}
