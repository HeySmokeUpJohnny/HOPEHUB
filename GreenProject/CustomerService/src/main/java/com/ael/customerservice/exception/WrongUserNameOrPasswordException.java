package com.ael.customerservice.exception;

public class WrongUserNameOrPasswordException extends RuntimeException {
    public WrongUserNameOrPasswordException(String message) {
        super(message);
    }
}
