# claudeCode_2 — 영진위 KOBIS 박스오피스 웹 애플리케이션

영화진흥위원회(영진위) KOBIS 오픈API를 연동한 Spring Boot 웹 애플리케이션입니다.

## 주요 기능

- **일별 박스오피스**: 날짜 선택 → 해당일 TOP10 순위 조회
- **주간 박스오피스**: 날짜 + 주간/주말/주중 구분 선택 → 순위 조회
- **영화 검색**: 영화명으로 검색 → 결과 목록 표시
- **영화 상세정보**: 감독, 배우, 장르, 국가 등 상세 팝업

## 기술 스택

| 영역 | 기술 |
|------|------|
| Backend | Java 17, Spring Boot 3.2, Maven |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| API | 영진위 KOBIS 오픈API |

## 사전 준비

### 1. Java 17+ 설치

https://adoptium.net/ 에서 Eclipse Temurin JDK 17 다운로드 & 설치

설치 확인:
```
java -version
```

### 2. Maven 설치

https://maven.apache.org/download.cgi 에서 다운로드 후 PATH 설정

설치 확인:
```
mvn -version
```

### 3. KOFIC API 키 발급

https://www.kobis.or.kr/kobisopenapi/ 접속 → 회원가입 → API 키 발급

### 4. 환경 변수 설정

**Windows CMD:**
```
set KOFIC_API_KEY=발급받은키
```

**Windows PowerShell:**
```
$env:KOFIC_API_KEY="발급받은키"
```

**macOS / Linux:**
```
export KOFIC_API_KEY=발급받은키
```

## 실행 방법

```
cd claudeCode_2
mvn spring-boot:run
```

브라우저에서 접속: http://localhost:8080

## API 엔드포인트

| 경로 | 설명 |
|------|------|
| `GET /api/boxoffice/daily?targetDt=YYYYMMDD` | 일별 박스오피스 |
| `GET /api/boxoffice/weekly?targetDt=YYYYMMDD&weekGb=0` | 주간 박스오피스 (0=주간, 1=주말, 2=주중) |
| `GET /api/movie/search?movieNm=영화명` | 영화 검색 |
| `GET /api/movie/info/{movieCd}` | 영화 상세정보 |

## 프로젝트 구조

```
src/main/java/com/example/kofic/
├── KoficApplication.java          # 진입점
├── config/AppConfig.java          # RestClient 빈
├── controller/                    # REST 컨트롤러
│   ├── BoxOfficeController.java
│   ├── MovieController.java
│   └── GlobalExceptionHandler.java
├── service/                       # 비즈니스 로직 + KOFIC API 호출
│   ├── BoxOfficeService.java
│   └── MovieService.java
└── dto/                           # 응답 DTO
    ├── boxoffice/
    └── movie/

src/main/resources/static/         # 프론트엔드 (Spring Boot 정적 리소스)
├── index.html
├── css/style.css
└── js/
    ├── api.js        # API 호출 모듈
    ├── boxoffice.js  # 박스오피스 렌더링
    ├── movie.js      # 영화 검색/상세/모달
    └── main.js       # 초기화, 탭 전환
```
