package com.cirosoft.chesifastasera.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cirosoft.chesifastasera.models.Event;
import com.cirosoft.chesifastasera.repositories.EventRepository;

@Service
public class EventService {
	
	private final EventRepository eventRepository;

	public EventService(EventRepository eventRepository) {
		 this.eventRepository = eventRepository;
	}

	
	
	public List<Event> getAll() {
		 return eventRepository.findAll();
	}

	public Optional<Event> getById(Long id) {
		 return eventRepository.findById(id);
	}

	public Event add(Event event) {
		 event.setId(null);
		 return eventRepository.save(event);
	}
	 
	

	public Optional<Event> update(Long id, Event event) {
		 if (!eventRepository.existsById(id)) {
			 return Optional.empty();
		 }
		 event.setId(id);
		 return Optional.of(eventRepository.save(event));
	}

	
	public boolean delete(Long id) {
		if (!eventRepository.existsById(id)) {
			return false;
		}
		eventRepository.deleteById(id);
		return true;
	}
	 
}