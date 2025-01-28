package com.codecademy.goldmedal.model;

public class Medals {
    private Iterable<GoldMedal> medals;

    public Medals(Iterable<GoldMedal> medals) {
        this.medals = medals;
    }

    public Iterable<GoldMedal> getMedals() {
        return medals;
    }

    public void setMedals(Iterable<GoldMedal> medals) {
        this.medals = medals;
    }
}
