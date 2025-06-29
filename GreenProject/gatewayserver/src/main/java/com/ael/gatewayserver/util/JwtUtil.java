package com.ael.gatewayserver.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${spring.security.jwt.secret}")
    private String secret;

    private SecretKey getSigningKey() {
        if (secret == null || secret.isEmpty()) {
            logger.error("JWT secret is null or empty! Check your configuration.");
            throw new IllegalStateException("JWT secret is not configured properly");
        }
        logger.debug("Using JWT secret: {}", secret.substring(0, Math.min(10, secret.length())) + "...");
        // Convert hex string to byte array
        byte[] keyBytes = hexStringToByteArray(secret.trim());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

    public Boolean validateToken(String token) {
        try {
            if (token == null || token.isEmpty()) {
                logger.warn("Token is null or empty");
                return false;
            }
            return !isTokenExpired(token);
        } catch (Exception e) {
            logger.error("Token validation failed: {}", e.getMessage(), e);
            return false;
        }
    }

    public String extractUsername(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            logger.error("Failed to extract username from token: {}", e.getMessage(), e);
            return null;
        }
    }

    public String extractRole(String token) {
        try {
            return extractClaim(token, claims -> claims.get("role", String.class));
        } catch (Exception e) {
            logger.error("Failed to extract role from token: {}", e.getMessage(), e);
            return null;
        }
    }

    public Integer extractCustomerId(String token) {
        try {
            return extractClaim(token, claims -> claims.get("customerId", Integer.class));
        } catch (Exception e) {
            logger.error("Failed to extract customerId from token: {}", e.getMessage(), e);
            return null;
        }
    }

    public Date extractExpiration(String token) {
        try {
            return extractClaim(token, Claims::getExpiration);
        } catch (Exception e) {
            logger.error("Failed to extract expiration from token: {}", e.getMessage(), e);
            return null;
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        if (expiration == null) {
            return true;
        }
        return expiration.before(new Date());
    }
}
