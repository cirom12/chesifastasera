package com.cirosoft.chesifastasera.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cirosoft.chesifastasera.models.Category;
import com.cirosoft.chesifastasera.models.Event;
import com.cirosoft.chesifastasera.services.EventService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("api/events")
public class EventController {
	
	//@Autowired risulta deprecato
	private final EventService eventService;

	EventController(EventService eventService) {
		this.eventService = eventService;
	}
	

	@GetMapping()
	public List<Event> getAll(
			@RequestParam(required = false ) Category category,
			@RequestParam(required = false ) String city,
			@RequestParam(required = false ) Boolean free,
			@RequestParam(required = false ) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
		return eventService.getAll(category, city, free, date);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Event> getById (@PathVariable Long id){
		return ResponseEntity.of(eventService.getById(id));
	}
	
	
	@PostMapping()
	public ResponseEntity<Event> add(@Valid@RequestBody Event event){ 
		Event saved = eventService.add(event);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Event> update(@PathVariable Long id, @Valid@RequestBody Event event) {
		return ResponseEntity.of(eventService.update(id, event));
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		if (eventService.delete(id)) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

}
