package com.restaurantreviews.controller;

import com.restaurantreviews.model.Review;
import com.restaurantreviews.model.Restaurant;
import com.restaurantreviews.model.ReviewStatus;
import com.restaurantreviews.model.User;

import com.restaurantreviews.repository.ReviewRepository;
import com.restaurantreviews.repository.RestaurantRepository;
import com.restaurantreviews.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final RestaurantRepository restaurantRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> createReview(@Valid @RequestBody Review review) {

        if (ObjectUtils.isEmpty(review.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is required!");
        }

        if (ObjectUtils.isEmpty(review.getRestaurantId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Restaurant id is required!");
        }

        if (ObjectUtils.isEmpty(review.getPeanutScore()) &&
                ObjectUtils.isEmpty(review.getEggScore()) &&
                ObjectUtils.isEmpty(review.getDairyScore())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Score is required!");
        }

        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(review.getRestaurantId());

        if (restaurantOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Restaurant does not exist!");
        }

        Optional<User> userOptional = userRepository.findByUsernameIgnoreCase(review.getUsername());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("User does not exist!");
        }

        try {
            review.setStatus(ReviewStatus.PENDING);
            reviewRepository.save(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating review!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Review created successfully!");
    }
}