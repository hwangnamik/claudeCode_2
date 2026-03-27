// boxoffice.js — 박스오피스 조회 및 렌더링
const Boxoffice = (() => {

    function toDateParam(inputValue) {
        return inputValue.replace(/-/g, '');
    }

    function rankBadge(rankOldAndNew, rankInten) {
        if (rankOldAndNew === 'NEW') {
            return '<span class="badge-new">NEW</span>';
        }
        const n = parseInt(rankInten, 10);
        if (n > 0) return `<span class="badge-up">▲${n}</span>`;
        if (n < 0) return `<span class="badge-down">▼${Math.abs(n)}</span>`;
        return '<span class="badge-same">-</span>';
    }

    function buildTable(items, onMovieClick) {
        const wrap = document.createElement('div');
        wrap.className = 'result-table-wrap';

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>순위</th>
                    <th>영화명</th>
                    <th>관객수</th>
                    <th>누적관객수</th>
                    <th>매출액</th>
                    <th>스크린수</th>
                    <th>상영횟수</th>
                    <th>개봉일</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.rank} ${rankBadge(item.rankOldAndNew, item.rankInten)}</td>
                <td><span class="movie-link" data-cd="${item.movieCd}">${item.movieNm}</span></td>
                <td>${Number(item.audiCnt).toLocaleString('ko-KR')}</td>
                <td>${Number(item.audiAcc).toLocaleString('ko-KR')}</td>
                <td>${Number(item.salesAmt).toLocaleString('ko-KR')}원</td>
                <td>${Number(item.scrnCnt).toLocaleString('ko-KR')}</td>
                <td>${Number(item.showCnt).toLocaleString('ko-KR')}</td>
                <td>${item.openDt || '-'}</td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.movie-link').forEach(el => {
            el.addEventListener('click', () => onMovieClick(el.dataset.cd));
        });

        wrap.appendChild(table);
        return wrap;
    }

    function showLoading(container) {
        container.innerHTML = '<div class="loading"><span class="spinner"></span>조회 중...</div>';
    }

    function showError(container, msg) {
        container.innerHTML = `<div class="error-msg">${msg}</div>`;
    }

    async function fetchDaily() {
        const dateInput = document.getElementById('daily-date');
        const resultEl = document.getElementById('daily-result');
        const rangeEl = document.getElementById('daily-range');

        if (!dateInput.value) {
            showError(resultEl, '기준일을 선택해주세요.');
            return;
        }

        showLoading(resultEl);
        rangeEl.textContent = '';

        try {
            const data = await API.getDailyBoxOffice(toDateParam(dateInput.value));
            const result = data.boxOfficeResult;
            const items = result.dailyBoxOfficeList || [];

            rangeEl.textContent = `조회 기간: ${result.showRange}`;

            if (items.length === 0) {
                resultEl.innerHTML = '<div class="empty-msg">데이터가 없습니다.</div>';
                return;
            }

            resultEl.innerHTML = '';
            resultEl.appendChild(buildTable(items, Movie.showDetail));
        } catch (err) {
            showError(resultEl, `오류: ${err.message}`);
        }
    }

    async function fetchWeekly() {
        const dateInput = document.getElementById('weekly-date');
        const weekGb = document.getElementById('weekly-gb').value;
        const resultEl = document.getElementById('weekly-result');
        const rangeEl = document.getElementById('weekly-range');

        if (!dateInput.value) {
            showError(resultEl, '기준일을 선택해주세요.');
            return;
        }

        showLoading(resultEl);
        rangeEl.textContent = '';

        try {
            const data = await API.getWeeklyBoxOffice(toDateParam(dateInput.value), weekGb);
            const result = data.boxOfficeResult;
            const items = result.weeklyBoxOfficeList || [];

            rangeEl.textContent = `조회 기간: ${result.showRange}`;

            if (items.length === 0) {
                resultEl.innerHTML = '<div class="empty-msg">데이터가 없습니다.</div>';
                return;
            }

            resultEl.innerHTML = '';
            resultEl.appendChild(buildTable(items, Movie.showDetail));
        } catch (err) {
            showError(resultEl, `오류: ${err.message}`);
        }
    }

    return { fetchDaily, fetchWeekly };
})();
