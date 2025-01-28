package com.codecademy.goldmedal.model;

public class CountrySummary extends Country {
    private int medals;

    public CountrySummary(Country country, int medals) {
        super(country);
        this.medals = medals;
    }

    public int getMedals() {
        return medals;
    }

    public void setMedals(int medals) {
        this.medals = medals;
    }
}
