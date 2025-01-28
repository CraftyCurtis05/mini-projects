package com.codecademy.plants.entities;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "ADVENTURES")
public class Adventure {

    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "DATE")
    private String date;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "CITY")
    private String city;

    @Column(name = "STATE")
    private String state;

    @Column(name = "NUM_PHOTOS")
    private Long numPhotos;

    @Column(name = "BLOG_COMPLETED")
    private Boolean blogCompleted;

    public Integer getId() {
        return this.id;
    }

    public String getDate() {
        return this.date;
    }

    public String getCountry() {
        return this.country;
    }

    public String getCity() {
        return this.city;
    }

    public String getState() {
        return this.state;
    }

    public Long getNumPhotos() {
        return this.numPhotos;
    }

    public Boolean getBlogCompleted() {
        return this.blogCompleted;
    }

    public void setBlogCompleted(Boolean blogCompleted) {
        this.blogCompleted = blogCompleted;
    }

}