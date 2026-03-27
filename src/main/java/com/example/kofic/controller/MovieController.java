package com.example.kofic.controller;

import com.example.kofic.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movie")
public class MovieController {

    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String movieNm) {
        return ResponseEntity.ok(service.searchMovies(movieNm));
    }

    @GetMapping("/info/{movieCd}")
    public ResponseEntity<?> info(@PathVariable String movieCd) {
        return ResponseEntity.ok(service.getMovieDetail(movieCd));
    }
}
