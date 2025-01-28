package com.restaurantreviews.controller;

import com.restaurantreviews.model.Restaurant;
import com.restaurantreviews.model.Review;
import com.restaurantreviews.model.ReviewStatus;

import com.restaurantreviews.repository.RestaurantRepository;
import com.restaurantreviews.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    @Autowired
    private final RestaurantRepository restaurantRepository;
    @Autowired
    private final ReviewRepository reviewRepository;

    @PostMapping
    public ResponseEntity<String> createRestaurant(@Valid @RequestBody Restaurant restaurant) {

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findByNameIgnoreCaseAndZipCode(restaurant.getName(), restaurant.getZipCode());

        if (optionalRestaurant.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Restaurant already exists!");
        }

        try {
            restaurant.setPeanutScore(0.0);
            restaurant.setEggScore(0.0);
            restaurant.setDairyScore(0.0);
            restaurant.setOverallScore(0.0);

            restaurantRepository.save(restaurant);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating restaurant!");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Restaurant created successfully!");
    }

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {

        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(id);

        if (restaurantOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(restaurantOptional.get());
    }

    @GetMapping("/{restaurantId}/approved-reviews")
    public ResponseEntity<List<Review>> getApprovedReviewsForRestaurant(@PathVariable Long restaurantId) {

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);

        if (optionalRestaurant.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No restaurants found.");
        }

        List<Review> approvedReviews = reviewRepository.findByRestaurantIdAndStatus(restaurantId, ReviewStatus.APPROVED);

        return ResponseEntity.status(HttpStatus.OK).body(approvedReviews);
    }
}