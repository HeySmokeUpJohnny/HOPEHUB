package com.ael.authservice.exception;


import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(FeignException.Unauthorized.class)
    public ResponseEntity<String> WrongUserNameOrPasswordException(FeignException.Unauthorized ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Kullanıcı adı veya şifre hatalı.");
    }

    @ExceptionHandler(FeignException.NotFound.class)
    public ResponseEntity<String> handleNotFound(FeignException.NotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Kullanıcı Bulunamadı");
    }

    @ExceptionHandler(FeignException.Conflict.class)
    public ResponseEntity<String> alreadyExist(FeignException.Conflict ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Kullanıcı mevcut");
    }

}
