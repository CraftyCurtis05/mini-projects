# Travel Adventures API

A Spring Boot project I used to practice connecting an entity, repository, and controller in a small API.

This is one of my Codecademy practice projects, so I keep it small and focused on the concept I was learning at the time.

## What I Practiced

- Spring Boot
- JPA entities
- repositories
- controller and API structure

## Built With

- Java
- Spring Boot
- Maven

## Project Structure

```text
├── .mvn/
├── src/
├── .gitignore
├── HELP.md
├── mvnw
├── mvnw.cmd
└── pom.xml
```

## Small UI I Added

I completed the basic `GET /adventures` controller method and added a small static page that reads the seeded H2 data. The UI can show every adventure or filter by country, which makes the repository/controller flow easier for me to see.

I kept the interface small on purpose so the original concept is still the part I am practicing.

## UI Theme

I used green and a warm travel-map accent here because it fits the idea of places, trips, and adventure data.

## Running the Project

Run the project with `./mvnw spring-boot:run` on macOS/Linux or `mvnw.cmd spring-boot:run` on Windows.

## Notes

I keep this project in my learning repository so I can look back at the code and see how I approached the concept when I first practiced it. I try to leave the code readable instead of making a small course exercise more complicated than it needs to be.
