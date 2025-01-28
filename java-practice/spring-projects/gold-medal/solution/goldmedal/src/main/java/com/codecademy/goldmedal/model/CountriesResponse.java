package com.codecademy.goldmedal.model;

import java.util.List;

public class CountriesResponse {
    private List<CountrySummary> countries;

    public CountriesResponse(List<CountrySummary> countries) {
        this.countries = countries;
    }

    public List<CountrySummary> getCountries() {
        return countries;
    }
}
