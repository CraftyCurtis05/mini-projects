package com.codecademy.goldmedal.model;

import java.util.List;

public class CountryMedalsListResponse {
    private List<GoldMedal> medals;

    public CountryMedalsListResponse(List<GoldMedal> medals) {
        this.medals = medals;
    }

    public List<GoldMedal> getMedals() {
        return medals;
    }

    public void setMedals(List<GoldMedal> medals) {
        this.medals = medals;
    }
}
