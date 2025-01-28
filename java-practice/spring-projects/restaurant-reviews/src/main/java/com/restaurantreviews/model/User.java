package com.restaurantreviews.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "USERS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "username", unique = true)
    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters.")
    private String username;

    @Column(name = "city")
    @NotBlank(message = "City is required.")
    @Size(min = 2, max = 39, message = "City must be between 2 and 39 characters.")
    private String city;

    @Column(name = "state")
    @NotBlank(message = "State is required.")
    @Size(min = 4, max = 13, message = "State must be between 4 and 13 characters.")
    private String state;

    @Column(name = "zip_code")
    @NotBlank(message = "Zip Code is required.")
    @Pattern(regexp = "^\\d{5}(?:-\\d{4})?$", message = "The ZIP code is invalid. It must be in the format 12345 or 12345-6789.")
    private String zipCode;

    @Column(name = "has_peanut_allergies")
    @NotNull(message = "Peanut allergy preference must be specified (true or false).")
    private Boolean hasPeanutAllergies;

    @Column(name = "has_egg_allergies")
    @NotNull(message = "Egg allergy preference must be specified (true or false).")
    private Boolean hasEggAllergies;

    @Column(name = "has_dairy_allergies")
    @NotNull(message = "Dairy allergy preference must be specified (true or false).")
    private Boolean hasDairyAllergies;
}