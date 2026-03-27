// movie.js — 영화 검색, 상세정보, 모달 처리
const Movie = (() => {

    function showLoading(container) {
        container.innerHTML = '<div class="loading"><span class="spinner"></span>검색 중...</div>';
    }

    function showError(container, msg) {
        container.innerHTML = `<div class="error-msg">${msg}</div>`;
    }

    function buildSearchTable(movies) {
        const wrap = document.createElement('div');
        wrap.className = 'result-table-wrap';

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>영화코드</th>
                    <th>영화명</th>
                    <th>영문명</th>
                    <th>개봉일</th>
                    <th>장르</th>
                    <th>국가</th>
                    <th>유형</th>
                    <th>상세</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');
        movies.forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${m.movieCd}</td>
                <td>${m.movieNm}</td>
                <td>${m.movieNmEn || '-'}</td>
                <td>${m.openDt || '-'}</td>
                <td>${m.repGenreNm || m.genreAlt || '-'}</td>
                <td>${m.repNationNm || m.nationAlt || '-'}</td>
                <td>${m.typeNm || '-'}</td>
                <td><button class="btn-detail" data-cd="${m.movieCd}">상세</button></td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.btn-detail').forEach(btn => {
            btn.addEventListener('click', () => showDetail(btn.dataset.cd));
        });

        wrap.appendChild(table);
        return wrap;
    }

    function renderModalContent(detail) {
        const directors = (detail.directors || []).map(d => d.peopleNm).join(', ') || '-';
        const actors = (detail.actors || []).slice(0, 5).map(a => a.cast ? `${a.peopleNm}(${a.cast})` : a.peopleNm).join(', ') || '-';
        const genres = (detail.genres || []).map(g => g.genreNm).join(', ') || '-';
        const nations = (detail.nations || []).map(n => n.nationNm).join(', ') || '-';
        const companies = (detail.companys || []).filter(c => c.companyPartNm === '제작사').map(c => c.companyNm).join(', ') || '-';

        return `
            <div class="detail-title">${detail.movieNm}</div>
            <div class="detail-title-en">${detail.movieNmEn || ''} ${detail.movieNmOg ? '/ ' + detail.movieNmOg : ''}</div>
            <div class="detail-grid">
                <span class="detail-label">감독</span>
                <span class="detail-value">${directors}</span>

                <hr class="detail-divider">

                <span class="detail-label">개봉일</span>
                <span class="detail-value">${detail.openDt || '-'}</span>

                <span class="detail-label">상영시간</span>
                <span class="detail-value">${detail.showTm ? detail.showTm + '분' : '-'}</span>

                <span class="detail-label">장르</span>
                <span class="detail-value">${genres}</span>

                <span class="detail-label">국가</span>
                <span class="detail-value">${nations}</span>

                <span class="detail-label">유형</span>
                <span class="detail-value">${detail.typeNm || '-'}</span>

                <span class="detail-label">제작상태</span>
                <span class="detail-value">${detail.prdtStatNm || '-'}</span>

                <hr class="detail-divider">

                <span class="detail-label">주요출연</span>
                <span class="detail-value">${actors}</span>

                <span class="detail-label">제작사</span>
                <span class="detail-value">${companies}</span>
            </div>
        `;
    }

    async function showDetail(movieCd) {
        const modal = document.getElementById('movie-modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = '<div class="loading"><span class="spinner"></span>불러오는 중...</div>';
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        try {
            const data = await API.getMovieDetail(movieCd);
            const detail = data.movieInfoResult && data.movieInfoResult.movieInfo;
            if (!detail) throw new Error('영화 정보를 찾을 수 없습니다.');
            modalBody.innerHTML = renderModalContent(detail);
        } catch (err) {
            modalBody.innerHTML = `<div class="error-msg">오류: ${err.message}</div>`;
        }
    }

    function closeModal() {
        document.getElementById('movie-modal').classList.add('hidden');
        document.body.style.overflow = '';
    }

    async function search() {
        const input = document.getElementById('movie-search-input');
        const resultEl = document.getElementById('search-result');
        const keyword = input.value.trim();

        if (!keyword) {
            showError(resultEl, '영화명을 입력해주세요.');
            return;
        }

        showLoading(resultEl);

        try {
            const data = await API.searchMovies(keyword);
            const result = data.movieListResult;
            const movies = result.movieList || [];

            if (movies.length === 0) {
                resultEl.innerHTML = `<div class="empty-msg">"${keyword}"에 대한 검색 결과가 없습니다.</div>`;
                return;
            }

            resultEl.innerHTML = '';
            const countInfo = document.createElement('div');
            countInfo.className = 'range-label';
            countInfo.textContent = `총 ${result.totCnt.toLocaleString('ko-KR')}건 중 ${movies.length}건 표시`;
            resultEl.appendChild(countInfo);
            resultEl.appendChild(buildSearchTable(movies));
        } catch (err) {
            showError(resultEl, `오류: ${err.message}`);
        }
    }

    return { search, showDetail, closeModal };
})();
