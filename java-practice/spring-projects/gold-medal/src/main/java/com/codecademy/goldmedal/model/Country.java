package com.codecademy.goldmedal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
public class Country {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String code;
    private BigDecimal gdp;
    private Integer population;

    public Country() {
    }

    public Country(Country country) {
        this.name = country.getName();
        this.code = country.getCode();
        this.gdp = country.getGdp();
        this.population = country.getPopulation();
    }

    public Country(String name, String code, BigDecimal gdp, Integer population) {
        this.name = name;
        this.code = code;
        this.gdp = gdp;
        this.population = population;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BigDecimal getGdp() {
        return gdp;
    }

    public void setGdp(BigDecimal gdp) {
        this.gdp = gdp;
    }

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }
}
