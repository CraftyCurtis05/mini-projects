package com.codecademy.plants.controllers;

import com.codecademy.plants.entities.Adventure;
import com.codecademy.plants.repositories.AdventureRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/adventures")
public class TravelAdventuresController {

    private final AdventureRepository adventureRepository;

    public TravelAdventuresController(AdventureRepository adventureRepository) {
        this.adventureRepository = adventureRepository;
    }

    @GetMapping
    public Iterable<Adventure> getAdventures(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String state) {

        // I keep the filters simple so I can see how repository methods connect to a request.
        if (country != null && !country.isBlank()) {
            return adventureRepository.findByCountry(country);
        }

        if (state != null && !state.isBlank()) {
            return adventureRepository.findByState(state);
        }

        return adventureRepository.findAll();
    }
}
