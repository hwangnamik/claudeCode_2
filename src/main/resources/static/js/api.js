// api.js — 백엔드 API 호출 중앙화 모듈
const API = (() => {
    async function get(path) {
        const res = await fetch(path);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.error || data.detail || `HTTP ${res.status} 오류`);
        }
        return data;
    }

    return {
        getDailyBoxOffice(targetDt) {
            return get(`/api/boxoffice/daily?targetDt=${targetDt}`);
        },
        getWeeklyBoxOffice(targetDt, weekGb) {
            return get(`/api/boxoffice/weekly?targetDt=${targetDt}&weekGb=${weekGb}`);
        },
        searchMovies(movieNm) {
            return get(`/api/movie/search?movieNm=${encodeURIComponent(movieNm)}`);
        },
        getMovieDetail(movieCd) {
            return get(`/api/movie/info/${movieCd}`);
        }
    };
})();
