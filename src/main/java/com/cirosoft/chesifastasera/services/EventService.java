package com.cirosoft.chesifastasera.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cirosoft.chesifastasera.models.Category;
import com.cirosoft.chesifastasera.models.Event;

@Service
public class EventService {
	
	private final List<Event> events = new ArrayList<>();
	private long nextId = 1;
	
	public EventService() {
		add(new Event(
				"Borgo diVino in Tour 2026",
				LocalDate.of(2026, 6, 26),
				LocalDate.of(2026, 6, 28),
				"Termoli",
				Category.FESTIVAL,
				false,
				"A pagamento",
				"18:00",
				"Tre giorni nel Borgo Antico di Termoli dedicati al vino di qualità: degustazioni, produttori, cibo gourmet e musica. Un evento imperdibile per gli amanti del buon bere tra i vicoli medievali affacciati sul mare.",
				"Experience Lab - info sui canali social dell'evento",
				"https://www.borgodivino.it"
			));
	 }
	
	public List<Event> getAll() {
		return events;
	}
	
	public Optional<Event> getById(Long id) {
		return events.stream()
		.filter(e -> e.getId().equals(id))
		.findFirst();
	}
	
	
	public Event add(Event event) {
		event.setId(nextId++);
		events.add(event);
		return event;
	}

}
