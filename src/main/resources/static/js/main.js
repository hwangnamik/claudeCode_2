// main.js — 탭 전환, 초기화, 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {

    // 탭 전환
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });

    // 기준일 기본값: 어제
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const ymd = yesterday.toISOString().slice(0, 10);
    document.getElementById('daily-date').value = ymd;
    document.getElementById('weekly-date').value = ymd;

    // 버튼 이벤트
    document.getElementById('daily-fetch-btn').addEventListener('click', Boxoffice.fetchDaily);
    document.getElementById('weekly-fetch-btn').addEventListener('click', Boxoffice.fetchWeekly);
    document.getElementById('movie-search-btn').addEventListener('click', Movie.search);

    // Enter 키로 검색
    document.getElementById('movie-search-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') Movie.search();
    });

    // 모달 닫기
    document.getElementById('modal-close-btn').addEventListener('click', Movie.closeModal);
    document.querySelector('.modal-overlay') && document.querySelector('.modal-overlay').addEventListener('click', Movie.closeModal);

    // 페이지 로드 시 일별 박스오피스 자동 조회
    Boxoffice.fetchDaily();
});
