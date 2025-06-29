package com.ael.gatewayserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        // Tüm frontend origin'lerini kabul et
        corsConfig.setAllowedOriginPatterns(Arrays.asList("*"));
        
        // Tüm HTTP metodlarını kabul et
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"));
        
        // Tüm header'ları kabul et
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        
        // Credentials'ı etkinleştir (cookies, authorization headers)
        corsConfig.setAllowCredentials(true);
        
        // Preflight istekleri için cache süresi
        corsConfig.setMaxAge(3600L);
        
        // Expose edilecek header'lar
        corsConfig.setExposedHeaders(Arrays.asList(
            "Authorization", 
            "X-User-Name", 
            "X-User-Role", 
            "X-Customer-Id",
            "X-Response-Time",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials"
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}