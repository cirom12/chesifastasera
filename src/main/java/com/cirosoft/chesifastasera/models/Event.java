package com.cirosoft.chesifastasera.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "events")
public class Event {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@NotBlank(message = "Il titolo è obbligatorio")
	@Size(max = 255, message = "Il titolo non può superare i 255 caratteri")
	@Column(nullable = false)
	private String title;
	
	@NotNull(message = "La data di inizio è obbligatoria")
	@Column(nullable = false)
	private LocalDate startDate;
	
	private LocalDate endDate; // facoltativa: null = evento di un solo giorno
	
	@NotBlank(message= "La città è obbligatoria")
	@Column(nullable = false)
	private String city;
	
	@NotNull(message= "La categoria è obbligatoria")
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Category category;
	
	@Column(nullable = false)
	private boolean free;
	
	private String ticketPrice; // facoltativo se free = true
	private String time;
	
	@Size(max = 2000, message = "La descrizone non può superare i 2000 caratteri")
	@Column(length = 2000)
	private String description;
	
	@Size(max = 1000, message = "I contatti non possono superare i 1000 caratteri")
	@Column(length = 1000)
	private String contacts;
	
	private String ticketUrl;
	
	//Costruttore
	public Event(String title, LocalDate startDate, LocalDate endDate, String city, Category category, boolean free,
			String ticketPrice, String time, String description, String contacts, String ticketUrl) {
		super();
		this.title = title;
		this.startDate = startDate;
		this.endDate = endDate;
		this.city = city;
		this.category = category;
		this.free = free;
		this.ticketPrice = ticketPrice;
		this.time = time;
		this.description = description;
		this.contacts = contacts;
		this.ticketUrl = ticketUrl;
	}

	//Costruttore vuoto
	public Event() {}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public boolean isFree() {
		return free;
	}

	public void setFree(boolean free) {
		this.free = free;
	}

	public String getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(String ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContacts() {
		return contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

	public String getTicketUrl() {
		return ticketUrl;
	}

	public void setTicketUrl(String ticketUrl) {
		this.ticketUrl = ticketUrl;
	}
	
	
	@AssertTrue(message = "La data di fine non può essere precedente a quella di inizio")
	private boolean isEndDateValid() {
		return endDate == null || startDate == null || !endDate.isBefore(startDate);
	}
	
}