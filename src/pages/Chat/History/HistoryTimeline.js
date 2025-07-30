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
            <h1>채팅 기록</h1>
            
            {/* global.css의 .input-group 스타일을 적용합니다. */}
            <div className="input-group search-wrapper">
                <input
                    type="text"
                    placeholder="기록의 제목을 검색해 보세요..."
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
