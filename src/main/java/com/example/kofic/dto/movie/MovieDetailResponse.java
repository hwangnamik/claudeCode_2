package com.example.kofic.dto.movie;

public class MovieDetailResponse {
    private MovieInfoResult movieInfoResult;

    public MovieInfoResult getMovieInfoResult() { return movieInfoResult; }
    public void setMovieInfoResult(MovieInfoResult movieInfoResult) { this.movieInfoResult = movieInfoResult; }

    public static class MovieInfoResult {
        private MovieDetail movieInfo;

        public MovieDetail getMovieInfo() { return movieInfo; }
        public void setMovieInfo(MovieDetail movieInfo) { this.movieInfo = movieInfo; }
    }
}
