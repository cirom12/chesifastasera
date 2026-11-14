package com.cirosoft.chesifastasera.models;

import java.time.LocalDate;

public class Event {
	
	private Long id;
	private String title;
	private LocalDate startDate;
	private LocalDate endDate; // facoltativa: null = evento di un solo giorno
	private String city;
	private Category category;
	private boolean free;
	private String ticketPrice; // facoltativo se free = true
	private String time;
	private String description;
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
	
}