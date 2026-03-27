package com.example.kofic.dto.movie;

import java.util.List;

public class MovieListResponse {
    private MovieListResult movieListResult;

    public MovieListResult getMovieListResult() { return movieListResult; }
    public void setMovieListResult(MovieListResult movieListResult) { this.movieListResult = movieListResult; }

    public static class MovieListResult {
        private int totCnt;
        private List<MovieListItem> movieList;

        public int getTotCnt() { return totCnt; }
        public void setTotCnt(int totCnt) { this.totCnt = totCnt; }
        public List<MovieListItem> getMovieList() { return movieList; }
        public void setMovieList(List<MovieListItem> movieList) { this.movieList = movieList; }
    }
}
