package com.codecademy.goldmedal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class GoldMedal {
    @Id
    @GeneratedValue
    private Long id;

    private Integer year;
    private String city;
    private String season;
    private String name;
    private String country;
    private String gender;
    private String sport;
    private String discipline;
    private String event;

    public GoldMedal() {
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public GoldMedal(Integer year,
                     String city,
                     String season,
                     String name,
                     String country,
                     String gender,
                     String sport,
                     String discipline,
                     String event) {
        this.year = year;
        this.city = city;
        this.season = season;
        this.name = name;
        this.country = country;
        this.gender = gender;
        this.sport = sport;
        this.discipline = discipline;
        this.event = event;
    }
}
