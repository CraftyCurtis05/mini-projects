package com.restaurantreviews.repository;

import com.restaurantreviews.model.User;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("select u from User u where upper(u.username) = upper(?1)")
    Optional<User> findByUsernameIgnoreCase(String username);
}