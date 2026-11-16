package com.cirosoft.chesifastasera.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.cirosoft.chesifastasera.models.Category;
import com.cirosoft.chesifastasera.models.Event;
import com.cirosoft.chesifastasera.repositories.EventRepository;

import jakarta.persistence.criteria.Predicate;

@Service
public class EventService {
	
	private final EventRepository eventRepository;

	public EventService(EventRepository eventRepository) {
		 this.eventRepository = eventRepository;
	}

	
	
	public List<Event> getAll(Category category, String city, Boolean free, LocalDate date) {
		Specification<Event> spec = (root, _, cb) -> {
			List<Predicate> predicates = new ArrayList<>();

			if (category != null) {
				predicates.add(cb.equal(root.get("category"), category));
			}
			if (city != null && !city.isBlank()) {
				predicates.add(cb.equal(cb.lower(root.get("city")), city.trim().toLowerCase()));
			}
			if (free != null) {
				predicates.add(cb.equal(root.get("free"), free));
			}
			if (date != null) {
				predicates.add(cb.lessThanOrEqualTo(root.<LocalDate>get("startDate"), date));
				predicates.add(cb.greaterThanOrEqualTo(
						cb.coalesce(root.<LocalDate>get("endDate"), root.<LocalDate>get("startDate")), date));
			}
			return cb.and(predicates.toArray(new Predicate[0]));
		 };
		 return eventRepository.findAll(spec, Sort.by("startDate").ascending());
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