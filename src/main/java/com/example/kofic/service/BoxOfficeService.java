package com.example.kofic.service;

import com.example.kofic.dto.boxoffice.DailyBoxOfficeResponse;
import com.example.kofic.dto.boxoffice.WeeklyBoxOfficeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class BoxOfficeService {

    private final RestClient restClient;

    @Value("${kofic.api.key}")
    private String apiKey;

    public BoxOfficeService(RestClient koficRestClient) {
        this.restClient = koficRestClient;
    }

    public DailyBoxOfficeResponse getDailyBoxOffice(String targetDt) {
        DailyBoxOfficeResponse response = restClient.get()
                .uri("/boxoffice/searchDailyBoxOfficeList.json?key={key}&targetDt={dt}",
                        apiKey, targetDt)
                .retrieve()
                .body(DailyBoxOfficeResponse.class);
        if (response == null || response.getBoxOfficeResult() == null) {
            throw new IllegalStateException("KOBIS API 응답이 올바르지 않습니다. API 키를 확인해주세요.");
        }
        return response;
    }

    public WeeklyBoxOfficeResponse getWeeklyBoxOffice(String targetDt, String weekGb) {
        WeeklyBoxOfficeResponse response = restClient.get()
                .uri("/boxoffice/searchWeeklyBoxOfficeList.json?key={key}&targetDt={dt}&weekGb={gb}",
                        apiKey, targetDt, weekGb)
                .retrieve()
                .body(WeeklyBoxOfficeResponse.class);
        if (response == null || response.getBoxOfficeResult() == null) {
            throw new IllegalStateException("KOBIS API 응답이 올바르지 않습니다. API 키를 확인해주세요.");
        }
        return response;
    }
}
