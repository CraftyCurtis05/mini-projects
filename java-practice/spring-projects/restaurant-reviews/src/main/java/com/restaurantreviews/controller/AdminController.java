package com.restaurantreviews.controller;

import com.restaurantreviews.model.*;
import com.restaurantreviews.repository.ReviewRepository;
import com.restaurantreviews.repository.RestaurantRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ResponseStatusException;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final RestaurantRepository restaurantRepository;

    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getByStatus(@RequestParam String status) {
        ReviewStatus reviewStatus;
        try {
            reviewStatus = ReviewStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid review status!");
        }

        List<Review> optionalReviews = reviewRepository.findByStatus(reviewStatus);
        if (optionalReviews.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No reviews with that status found!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(optionalReviews);
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> updateStatus(@PathVariable("id") Long id, @Valid @RequestBody AdminReviewAction action) {

        Optional<Review> reviewToUpdateOptional = reviewRepository.findById(id);

        if (reviewToUpdateOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found!");
        }

        Review reviewToUpdate = reviewToUpdateOptional.get();

        reviewToUpdate.setStatus(action.getReviewApproved() ? ReviewStatus.APPROVED : ReviewStatus.REJECTED);

        try {
            reviewRepository.save(reviewToUpdate);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating review status!");
        }

        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(reviewToUpdate.getRestaurantId());

        if (restaurantOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found!");
        }

        Restaurant restaurantToUpdate = restaurantOptional.get();

        if (action.getReviewApproved()) {
            updateScores(restaurantToUpdate);
        }
        return ResponseEntity.status(HttpStatus.OK).body(reviewToUpdate);
    }

    private void updateScores(Restaurant restaurant) {

        List<Review> reviews = reviewRepository.findByRestaurantIdAndStatus(restaurant.getId(), ReviewStatus.APPROVED);

        if (reviews.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No approved reviews found for this restaurant!");
        }

        int peanutSum = 0, peanutCount = 0;
        int dairySum = 0, dairyCount = 0;
        int eggSum = 0, eggCount = 0;

        for (Review review : reviews) {
            if (!ObjectUtils.isEmpty(review.getPeanutScore())) {
                peanutSum += review.getPeanutScore();
                peanutCount++;
            }
            if (!ObjectUtils.isEmpty(review.getDairyScore())) {
                dairySum += review.getDairyScore();
                dairyCount++;
            }
            if (!ObjectUtils.isEmpty(review.getEggScore())) {
                eggSum += review.getEggScore();
                eggCount++;
            }
        }

        DecimalFormat decimalFormat = new DecimalFormat("#.##");

        restaurant.setPeanutScore(peanutCount > 0 ? Double.parseDouble(decimalFormat.format((double) peanutSum / peanutCount)) : 0.0);
        restaurant.setDairyScore(dairyCount > 0 ? Double.parseDouble(decimalFormat.format((double) dairySum / dairyCount)) : 0.0);
        restaurant.setEggScore(eggCount > 0 ? Double.parseDouble(decimalFormat.format((double) eggSum / eggCount)) : 0.0);

        int totalCount = peanutCount + dairyCount + eggCount;
        double overallScore = totalCount > 0 ? (double) (peanutSum + dairySum + eggSum) / totalCount : 0.0;
        restaurant.setOverallScore(Double.parseDouble(decimalFormat.format(overallScore)));

        try {
            restaurantRepository.save(restaurant);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating restaurant scores!");
        }
    }
}