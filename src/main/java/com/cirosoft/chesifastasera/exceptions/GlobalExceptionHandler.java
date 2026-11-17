package com.cirosoft.chesifastasera.exceptions;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
		List<String> details = ex.getBindingResult().getAllErrors().stream()
				.map(error -> error.getDefaultMessage())
				.toList();
		return build(HttpStatus.BAD_REQUEST, "Dati non validi", details);
	 }

	 @ExceptionHandler(HttpMessageNotReadableException.class)
	 public ResponseEntity<ApiError> handleUnreadable(HttpMessageNotReadableException ex) {
		 return build(HttpStatus.BAD_REQUEST,
				 "Corpo della richiesta non leggibile: controlla il JSON, le date (aaaa-mm-gg) e la categoria",
				 List.of());
	 }

	 @ExceptionHandler(MethodArgumentTypeMismatchException.class)
	 public ResponseEntity<ApiError> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
		 return build(HttpStatus.BAD_REQUEST,
				 "Il valore del parametro '" + ex.getName() + "' non è valido",
				 List.of());
	 }

	 private ResponseEntity<ApiError> build(HttpStatus status, String message, List<String> details) {
		 ApiError body = new ApiError(status.value(), message, details, LocalDateTime.now());
		 return ResponseEntity.status(status).body(body);
	 }

}
