package com.example.kofic.service;

import com.example.kofic.dto.movie.MovieDetailResponse;
import com.example.kofic.dto.movie.MovieListResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MovieService {

    private final RestClient restClient;

    @Value("${kofic.api.key}")
    private String apiKey;

    public MovieService(RestClient koficRestClient) {
        this.restClient = koficRestClient;
    }

    public MovieListResponse searchMovies(String movieNm) {
        return restClient.get()
                .uri("/movie/searchMovieList.json?key={key}&movieNm={nm}",
                        apiKey, movieNm)
                .retrieve()
                .body(MovieListResponse.class);
    }

    public MovieDetailResponse getMovieDetail(String movieCd) {
        return restClient.get()
                .uri("/movie/searchMovieInfo.json?key={key}&movieCd={cd}",
                        apiKey, movieCd)
                .retrieve()
                .body(MovieDetailResponse.class);
    }
}
