package com.example.kofic.controller;

import com.example.kofic.service.BoxOfficeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boxoffice")
public class BoxOfficeController {

    private final BoxOfficeService service;

    public BoxOfficeController(BoxOfficeService service) {
        this.service = service;
    }

    @GetMapping("/daily")
    public ResponseEntity<?> daily(@RequestParam String targetDt) {
        return ResponseEntity.ok(service.getDailyBoxOffice(targetDt));
    }

    @GetMapping("/weekly")
    public ResponseEntity<?> weekly(
            @RequestParam String targetDt,
            @RequestParam(defaultValue = "0") String weekGb) {
        return ResponseEntity.ok(service.getWeeklyBoxOffice(targetDt, weekGb));
    }
}
