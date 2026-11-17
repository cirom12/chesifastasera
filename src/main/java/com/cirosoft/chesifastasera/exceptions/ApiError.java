package com.cirosoft.chesifastasera.exceptions;

import java.time.LocalDateTime;
import java.util.List;

public record ApiError(int status, String message, List<String> details, LocalDateTime timestamp) {

}
