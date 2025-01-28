package com.restaurantreviews.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="RESTAURANTS")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotBlank(message = "Restaurant name is required.")
    @Size(min = 3, max = 50, message = "Restaurant name must be between 3 and 50 characters.")
    private String name;

    @Column(name = "street")
    @NotBlank(message = "Street is required.")
    @Size(max = 100, message = "Street name must be less than or equal to 100 characters.")
    private String street;

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
    @Pattern(regexp = "^\\d{5}(?:-\\d{4})?$",
            message = "The Zip Code is invalid. It must be in the format 12345 or 12345-6789.")
    private String zipCode;

    @Column(name = "phone")
    @NotBlank(message = "Phone number is required.")
    @Pattern(regexp = "^(\\+1\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
            message = "Phone number must be in the format: (123) 456-7890, 123-456-7890, or similar.")
    private String phone;

    @Column(name = "website_url")
    @NotBlank(message = "Website url is required.")
    @Pattern(regexp = "^(https?://)?(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+(/\\S*)?$",
            message = "Please provide a valid URL (e.g., https://www.example.com or www.example.com).")
    private String websiteURL;

    @Column(name = "cuisine_type")
    @NotBlank(message = "Cuisine type is required.")
    @Size(min = 4, max = 20, message = "Cuisine type must be between 2 and 20 characters.")
    private String cuisineType;

    @Column(name = "peanut_score")
    private double peanutScore = 0.0;

    @Column(name = "egg_score")
    private double eggScore = 0.0;

    @Column(name = "dairy_score")
    private double dairyScore = 0.0;

    @Column(name = "overall_score")
    private double overallScore = 0.0;
}