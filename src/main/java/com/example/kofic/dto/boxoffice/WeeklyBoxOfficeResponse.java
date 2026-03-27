package com.example.kofic.dto.boxoffice;

import java.util.List;

public class WeeklyBoxOfficeResponse {
    private BoxOfficeResult boxOfficeResult;

    public BoxOfficeResult getBoxOfficeResult() { return boxOfficeResult; }
    public void setBoxOfficeResult(BoxOfficeResult boxOfficeResult) { this.boxOfficeResult = boxOfficeResult; }

    public static class BoxOfficeResult {
        private String boxofficeType;
        private String showRange;
        private List<WeeklyBoxOfficeItem> weeklyBoxOfficeList;

        public String getBoxofficeType() { return boxofficeType; }
        public void setBoxofficeType(String boxofficeType) { this.boxofficeType = boxofficeType; }
        public String getShowRange() { return showRange; }
        public void setShowRange(String showRange) { this.showRange = showRange; }
        public List<WeeklyBoxOfficeItem> getWeeklyBoxOfficeList() { return weeklyBoxOfficeList; }
        public void setWeeklyBoxOfficeList(List<WeeklyBoxOfficeItem> weeklyBoxOfficeList) { this.weeklyBoxOfficeList = weeklyBoxOfficeList; }
    }
}
