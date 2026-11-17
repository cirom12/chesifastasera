package com.cirosoft.chesifastasera.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cirosoft.chesifastasera.models.Event;
import com.cirosoft.chesifastasera.repositories.EventRepository;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

	@Mock
	private EventRepository eventRepository;

	@InjectMocks
	private EventService eventService;

	@Test
	void getById_whenEventExists_returnsIt() {
		Event event = new Event();
		event.setId(1L);
		when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

		Optional<Event> result = eventService.getById(1L);

		assertTrue(result.isPresent());
		assertEquals(1L, result.get().getId());
	}

	 @Test
	 void getById_whenEventDoesNotExist_returnsEmpty() {
		 when(eventRepository.findById(99L)).thenReturn(Optional.empty());

		 assertTrue(eventService.getById(99L).isEmpty());
	 }

	 @Test
	 void add_resetsIdBeforeSaving() {
		 Event event = new Event();
		 event.setId(5L);
		 when(eventRepository.save(any(Event.class))).thenAnswer(inv -> inv.getArgument(0));

		 Event saved = eventService.add(event);

		 assertNull(saved.getId());
	 }

	 @Test
	 void update_whenEventExists_usesIdFromUrl() {
	 Event event = new Event();
	 event.setId(7L);
	 when(eventRepository.existsById(1L)).thenReturn(true);
	 when(eventRepository.save(any(Event.class))).thenAnswer(inv -> inv.getArgument(0));

	 Optional<Event> result = eventService.update(1L, event);

	 assertTrue(result.isPresent());
	 assertEquals(1L, result.get().getId());
	 }

	 @Test
	 void update_whenEventDoesNotExist_returnsEmptyAndDoesNotSave() {
		 when(eventRepository.existsById(99L)).thenReturn(false);

		 assertTrue(eventService.update(99L, new Event()).isEmpty());
		 verify(eventRepository, never()).save(any());
	 }

	 @Test
	 void delete_whenEventExists_deletesAndReturnsTrue() {
		 when(eventRepository.existsById(1L)).thenReturn(true);

		 assertTrue(eventService.delete(1L));
		 verify(eventRepository).deleteById(1L);
	 }

	 @Test
	 void delete_whenEventDoesNotExist_returnsFalseAndDoesNotDelete() {
		 when(eventRepository.existsById(99L)).thenReturn(false);

		 assertFalse(eventService.delete(99L));
		 verify(eventRepository, never()).deleteById(any());
	 }
	
}
