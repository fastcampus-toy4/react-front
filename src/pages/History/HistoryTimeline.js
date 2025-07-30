import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryTimeline.css'; // 수정된 CSS 파일을 불러옵니다.

// --- 가상 데이터 (색상 정보는 CSS에서 처리하므로 제거) ---
const historyData = [
    {
        date: "2025년 7월 29일",
        items: [
            { chatId: 'chat_abc_123', time: '오후 2:45', title: '강남역 근처 맛집 추천', tags: ['#강남역', '#점심', '#한식'] },
            { chatId: 'chat_def_456', time: '오전 11:10', title: '당뇨 환자를 위한 저당분 디저트', tags: ['#건강식', '#디저트', '#저당'] }
        ]
    },
    {
        date: "2025년 7월 28일",
        items: [
            { chatId: 'chat_ghi_789', time: '오후 7:20', title: '성수동 분위기 좋은 와인바', tags: ['#성수동', '#와인바', '#데이트'] }
        ]
    },
    {
        date: "2025년 7월 26일",
        items: [
            { chatId: 'chat_1', time: '오후 7:15', title: '날것 못 먹는 애인과 갈 연남동 데이트 맛집', tags: ['#연남동', '#데이트', '#날것싫어'] },
            { chatId: 'chat_2', time: '오후 12:30', title: '여의도 점심, 땅콩 알러지 동료와 함께 갈만한 곳', tags: ['#여의도', '#점심', '#알러지케어'] }
        ]
    },
    {
        date: "2025년 7월 25일",
        items: [
            { chatId: 'chat_3', time: '오후 6:50', title: '당뇨 있으신 부모님과 함께할 광화문 저녁 식사', tags: ['#광화문', '#가족모임', '#당뇨식'] }
        ]
    },
    {
        date: "2025년 7월 20일",
        items: [
            { chatId: 'chat_4', time: '오후 1:00', title: '삼성역 근처 고수 안 들어간 혼밥 메뉴', tags: ['#삼성역', '#혼밥', '#고수빼고'] },
            { chatId: 'chat_5', time: '오전 11:40', title: '유당불내증 친구와 즐길 한남동 브런치 카페', tags: ['#한남동', '#브런치', '#유당불내증'] }
        ]
    },
    {
        date: "2025년 7월 10일",
        items: [
            { chatId: 'chat_6', time: '오후 9:20', title: '고혈압이라 저염식 야식이 필요한데, 홍대 근처 추천', tags: ['#홍대', '#야식', '#고혈압'] },
            { chatId: 'chat_7', time: '오후 6:30', title: '채식주의자 팀원과 함께 갈 이태원 회식 장소', tags: ['#이태원', '#회식', '#채식'] }
        ]
    },
    {
        date: "2025년 7월 9일",
        items: [
            { chatId: 'chat_8', time: '오후 12:55', title: '비 오는 날, 밀가루 싫어하는 사람을 위한 종로 점심', tags: ['#종로', '#비오는날', '#국물'] },
            { chatId: 'chat_9', time: '오후 8:05', title: '위염 때문에 매운 거 못 먹는데, 압구정 건강식 저녁', tags: ['#압구정', '#저녁', '#위염'] },
            { chatId: 'chat_10', time: '오후 12:10', title: '시청 근처 오이 안 들어간 빠른 점심 메뉴', tags: ['#시청', '#점심', '#오이싫어'] }
        ]
    }
];

// SVG 아이콘 컴포넌트
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

function HistoryTimeline() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredHistory = useMemo(() => {
        if (!searchTerm) return historyData;
        const lowercasedTerm = searchTerm.toLowerCase();
        return historyData.map(group => ({
            ...group,
            items: group.items.filter(item => item.title.toLowerCase().includes(lowercasedTerm))
        })).filter(group => group.items.length > 0);
    }, [searchTerm]);

    const handleHistoryClick = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    return (
        <div className="timeline-page">
            {/* h1 태그는 global.css의 스타일을 따릅니다. */}
            <h1>CHAT HISTORY</h1>
            
            {/* global.css의 .input-group 스타일을 적용합니다. */}
            <div className="input-group search-wrapper">
                <input
                    type="text"
                    placeholder="기록의 제목을 검색해 보세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="timeline-container">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((group) => (
                        <div key={group.date}>
                            <div className="timeline-date-group">
                                <div className="timeline-date-icon-wrapper">
                                    <CalendarIcon />
                                </div>
                                <h3 className="timeline-date">{group.date}</h3>
                            </div>
                            
                            {group.items.map((item) => (
                                <div key={item.chatId} className="timeline-item" onClick={() => handleHistoryClick(item.chatId)}>
                                    <div className="timeline-dot-wrapper">
                                        <div className="timeline-dot"></div>
                                    </div>
                                    {/* global.css의 .card 스타일을 적용합니다. */}
                                    <div className="card timeline-card">
                                        <p className="card-time">{item.time}</p>
                                        <h4 className="card-title">{item.title}</h4>
                                        <div className="card-tags">
                                            {item.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="no-results">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default HistoryTimeline;
