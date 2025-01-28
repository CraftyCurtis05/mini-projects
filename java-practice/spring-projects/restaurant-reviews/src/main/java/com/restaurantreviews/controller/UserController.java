package com.restaurantreviews.controller;

import com.restaurantreviews.repository.UserRepository;
import com.restaurantreviews.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {

        Optional<User> userOptional = userRepository.findByUsernameIgnoreCase(user.getUsername());

        if (userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists!");
        }

        try {
            userRepository.save(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully!");
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByDisplayName(@PathVariable("username") String username) {

        Optional<User> userOptional = userRepository.findByUsernameIgnoreCase(username);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userOptional.get());
    }

    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable("username") String username, @Valid @RequestBody User user) {

        Optional<User> userToUpdateOptional = userRepository.findByUsernameIgnoreCase(username);

        if (userToUpdateOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        }

        User userToUpdate = userToUpdateOptional.get();

        userToUpdate.setCity(user.getCity());
        userToUpdate.setState(user.getState());
        userToUpdate.setZipCode(user.getZipCode());
        userToUpdate.setHasPeanutAllergies(user.getHasPeanutAllergies());
        userToUpdate.setHasEggAllergies(user.getHasEggAllergies());
        userToUpdate.setHasDairyAllergies(user.getHasDairyAllergies());

        try {
            userRepository.save(userToUpdate);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating user!");
        }

        return ResponseEntity.status(HttpStatus.OK).body(userToUpdate);
    }
}