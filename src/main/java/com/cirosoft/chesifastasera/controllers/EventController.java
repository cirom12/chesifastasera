package com.cirosoft.chesifastasera.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cirosoft.chesifastasera.models.Event;
import com.cirosoft.chesifastasera.services.EventService;


@RestController
@RequestMapping("api/events")
public class EventController {
	
	//@Autowired risulta deprecato
	private final EventService eventService;

	EventController(EventService eventService) {
		this.eventService = eventService;
	}
	

	@GetMapping()
	public List<Event> getAll(){
		return eventService.getAll();
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Event> getById (@PathVariable Long id){
		return ResponseEntity.of(eventService.getById(id));
	}
	
	@PostMapping()
	public ResponseEntity<Event> add(@RequestBody Event event){ 
		Event saved = eventService.add(event);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

}
