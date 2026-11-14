package com.cirosoft.chesifastasera.models;

public enum Category {
	CONCERT ("Concerto"),
	FESTIVAL ("Sagra"),
	PARTY ("Festa"),
	CULTURE ("Cultura"),
	SPORT ("Sport"),
	TRIP ("Gita");
	
	private final String label;

	Category(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
	
	
}
