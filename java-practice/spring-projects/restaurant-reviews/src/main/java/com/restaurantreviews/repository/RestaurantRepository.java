package com.restaurantreviews.repository;

import com.restaurantreviews.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("select r from Restaurant r where upper(r.name) = upper(?1) and r.zipCode = ?2")
    Optional<Restaurant> findByNameIgnoreCaseAndZipCode(String name, String zipCode);
}