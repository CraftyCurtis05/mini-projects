package com.restaurantreviews.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "REVIEWS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "restaurant_id")
    @NotNull(message = "Restaurant ID is required.")
    private Long restaurantId;

    @Column(name = "username")
    @NotBlank(message = "Username is required.")
    private String username;

    @Column(name = "peanut_score")
    private Integer peanutScore;

    @Column(name = "egg_score")
    private Integer eggScore;

    @Column(name = "dairy_score")
    private Integer dairyScore;

    @Column(name = "commentary")
    private String commentary;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ReviewStatus status;
}