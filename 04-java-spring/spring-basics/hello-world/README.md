# Spring Boot Hello World

An introductory Spring Boot project I used to practice the basic application structure and serving a simple web response.

This is one of my Codecademy practice projects, so I keep it small and focused on the concept I was learning at the time.

## What I Practiced

- Spring Boot project structure
- controllers
- request mappings
- running a Maven-based application

## Built With

- HTML
- Java
- Spring Boot
- Maven

## Project Structure

```text
├── .mvn/
├── src/
├── .gitattributes
├── .gitignore
├── HELP.md
├── mvnw
├── mvnw.cmd
└── pom.xml
```

## Small UI I Added

This project already had Thymeleaf pages, but they were mostly starter markup. I turned the home page into a small greeting form that sends a `name` query parameter to `GreetingController` and displays the model value on the result page.

I kept the interface small on purpose so the original concept is still the part I am practicing.

## UI Theme

I used a simple Spring green theme here so the page visually matches the framework without turning it into a branded mockup.

## Running the Project

Run the project with `./mvnw spring-boot:run` on macOS/Linux or `mvnw.cmd spring-boot:run` on Windows.

## Notes

I keep this project in my learning repository so I can look back at the code and see how I approached the concept when I first practiced it. I try to leave the code readable instead of making a small course exercise more complicated than it needs to be.
