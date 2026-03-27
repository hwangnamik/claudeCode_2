package com.example.kofic.dto.movie;

import java.util.List;

public class MovieDetail {
    private String movieCd;
    private String movieNm;
    private String movieNmEn;
    private String movieNmOg;
    private String prdtYear;
    private String showTm;
    private String openDt;
    private String prdtStatNm;
    private String typeNm;
    private List<GenreItem> genres;
    private List<NationItem> nations;
    private List<ActorItem> actors;
    private List<DirectorItem> directors;
    private List<CompanyItem> companys;

    public String getMovieCd() { return movieCd; }
    public void setMovieCd(String movieCd) { this.movieCd = movieCd; }
    public String getMovieNm() { return movieNm; }
    public void setMovieNm(String movieNm) { this.movieNm = movieNm; }
    public String getMovieNmEn() { return movieNmEn; }
    public void setMovieNmEn(String movieNmEn) { this.movieNmEn = movieNmEn; }
    public String getMovieNmOg() { return movieNmOg; }
    public void setMovieNmOg(String movieNmOg) { this.movieNmOg = movieNmOg; }
    public String getPrdtYear() { return prdtYear; }
    public void setPrdtYear(String prdtYear) { this.prdtYear = prdtYear; }
    public String getShowTm() { return showTm; }
    public void setShowTm(String showTm) { this.showTm = showTm; }
    public String getOpenDt() { return openDt; }
    public void setOpenDt(String openDt) { this.openDt = openDt; }
    public String getPrdtStatNm() { return prdtStatNm; }
    public void setPrdtStatNm(String prdtStatNm) { this.prdtStatNm = prdtStatNm; }
    public String getTypeNm() { return typeNm; }
    public void setTypeNm(String typeNm) { this.typeNm = typeNm; }
    public List<GenreItem> getGenres() { return genres; }
    public void setGenres(List<GenreItem> genres) { this.genres = genres; }
    public List<NationItem> getNations() { return nations; }
    public void setNations(List<NationItem> nations) { this.nations = nations; }
    public List<ActorItem> getActors() { return actors; }
    public void setActors(List<ActorItem> actors) { this.actors = actors; }
    public List<DirectorItem> getDirectors() { return directors; }
    public void setDirectors(List<DirectorItem> directors) { this.directors = directors; }
    public List<CompanyItem> getCompanys() { return companys; }
    public void setCompanys(List<CompanyItem> companys) { this.companys = companys; }

    public static class GenreItem {
        private String genreNm;
        public String getGenreNm() { return genreNm; }
        public void setGenreNm(String genreNm) { this.genreNm = genreNm; }
    }

    public static class NationItem {
        private String nationNm;
        public String getNationNm() { return nationNm; }
        public void setNationNm(String nationNm) { this.nationNm = nationNm; }
    }

    public static class ActorItem {
        private String peopleNm;
        private String cast;
        public String getPeopleNm() { return peopleNm; }
        public void setPeopleNm(String peopleNm) { this.peopleNm = peopleNm; }
        public String getCast() { return cast; }
        public void setCast(String cast) { this.cast = cast; }
    }

    public static class DirectorItem {
        private String peopleNm;
        public String getPeopleNm() { return peopleNm; }
        public void setPeopleNm(String peopleNm) { this.peopleNm = peopleNm; }
    }

    public static class CompanyItem {
        private String companyCd;
        private String companyNm;
        private String companyPartNm;
        public String getCompanyCd() { return companyCd; }
        public void setCompanyCd(String companyCd) { this.companyCd = companyCd; }
        public String getCompanyNm() { return companyNm; }
        public void setCompanyNm(String companyNm) { this.companyNm = companyNm; }
        public String getCompanyPartNm() { return companyPartNm; }
        public void setCompanyPartNm(String companyPartNm) { this.companyPartNm = companyPartNm; }
    }
}
