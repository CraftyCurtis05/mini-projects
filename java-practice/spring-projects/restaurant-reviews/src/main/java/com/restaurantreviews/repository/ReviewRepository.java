package com.restaurantreviews.repository;

import com.restaurantreviews.model.Review;
import com.restaurantreviews.model.ReviewStatus;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.restaurantId = ?1 AND r.status = ?2")
    List<Review> findByRestaurantIdAndStatus(@NonNull Long restaurantId, @NonNull ReviewStatus status);

    @Query("SELECT r FROM Review r WHERE r.status = ?1")
    List<Review> findByStatus(@NonNull ReviewStatus status);
}