package com.codecademy.goldmedal.model;

import java.math.BigDecimal;

public class CountryDetailsResponse {
    private String name;
    private BigDecimal gdp;
    private Integer population;
    private Integer numberMedals;
    private Integer numberSummerWins;
    private Float percentageTotalSummerWins;
    private Integer yearFirstSummerWin;
    private Integer numberWinterWins;
    private Float percentageTotalWinterWins;
    private Integer yearFirstWinterWin;
    private Integer numberEventsWonByFemaleAthletes;
    private Integer numberEventsWonByMaleAthletes;

    public CountryDetailsResponse(String name) {
        this.name = name;
    }

    public CountryDetailsResponse(String name,
                                  BigDecimal gdp,
                                  Integer population,
                                  Integer numberMedals,
                                  Integer numberSummerWins,
                                  Float percentageTotalSummerWins,
                                  Integer yearFirstSummerWin,
                                  Integer numberWinterWins,
                                  Float percentageTotalWinterWins,
                                  Integer yearFirstWinterWin,
                                  Integer numberEventsWonByFemaleAthletes,
                                  Integer numberEventsWonByMaleAthletes) {
        this.name = name;
        this.gdp = gdp;
        this.population = population;
        this.numberMedals = numberMedals;
        this.numberSummerWins = numberSummerWins;
        this.percentageTotalSummerWins = percentageTotalSummerWins;
        this.yearFirstSummerWin = yearFirstSummerWin;
        this.numberWinterWins = numberWinterWins;
        this.percentageTotalWinterWins = percentageTotalWinterWins;
        this.yearFirstWinterWin = yearFirstWinterWin;
        this.numberEventsWonByFemaleAthletes = numberEventsWonByFemaleAthletes;
        this.numberEventsWonByMaleAthletes = numberEventsWonByMaleAthletes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGdp() {
        return gdp != null ? gdp.toPlainString() : "-";
    }

    public void setGdp(BigDecimal gdp) {
        this.gdp = gdp;
    }

    public String getPopulation() {
        return population != null ? population.toString() : "-";
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public String getNumberMedals() {
        return numberMedals != null ? numberMedals.toString() : "-";
    }

    public void setNumberMedals(Integer numberMedals) {
        this.numberMedals = numberMedals;
    }

    public String getNumberSummerWins() {
        return numberSummerWins != null ? numberSummerWins.toString() : "-";
    }

    public void setNumberSummerWins(Integer numberSummerWins) {
        this.numberSummerWins = numberSummerWins;
    }

    public String getPercentageTotalSummerWins() {
        return percentageTotalSummerWins != null ? Float.valueOf(percentageTotalSummerWins * 100).toString() : "-";
    }

    public void setPercentageTotalSummerWins(Float percentageTotalSummerWins) {
        this.percentageTotalSummerWins = percentageTotalSummerWins;
    }

    public String getYearFirstSummerWin() {
        return yearFirstSummerWin != null ? yearFirstSummerWin.toString() : "-";
    }

    public void setYearFirstSummerWin(Integer yearFirstSummerWin) {
        this.yearFirstSummerWin = yearFirstSummerWin;
    }

    public String getNumberWinterWins() {
        return numberWinterWins != null ? numberWinterWins.toString() : "-";
    }

    public void setNumberWinterWins(Integer numberWinterWins) {
        this.numberWinterWins = numberWinterWins;
    }

    public String getPercentageTotalWinterWins() {
        return percentageTotalWinterWins != null ? Float.valueOf(percentageTotalWinterWins * 100).toString() : "-";
    }

    public void setPercentageTotalWinterWins(Float percentageTotalWinterWins) {
        this.percentageTotalWinterWins = percentageTotalWinterWins;
    }

    public String getYearFirstWinterWin() {
        return yearFirstWinterWin != null ? yearFirstWinterWin.toString() : "-";
    }

    public void setYearFirstWinterWin(Integer yearFirstWinterWin) {
        this.yearFirstWinterWin = yearFirstWinterWin;
    }

    public String getNumberEventsWonByFemaleAthletes() {
        return numberEventsWonByFemaleAthletes != null ? numberEventsWonByFemaleAthletes.toString() : "-";
    }

    public void setNumberEventsWonByFemaleAthletes(Integer numberEventsWonByFemaleAthletes) {
        this.numberEventsWonByFemaleAthletes = numberEventsWonByFemaleAthletes;
    }

    public String getNumberEventsWonByMaleAthletes() {
        return numberEventsWonByMaleAthletes != null ? numberEventsWonByMaleAthletes.toString() : "-";
    }

    public void setNumberEventsWonByMaleAthletes(Integer numberEventsWonByMaleAthletes) {
        this.numberEventsWonByMaleAthletes = numberEventsWonByMaleAthletes;
    }

}
