import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryTimeline.css';

// --- 가상 데이터  ---
const historyData = [
    {
        date: "2025년 7월 29일",
        items: [
            { chatId: 'chat_abc_123', time: '오후 2:45', title: '강남역 근처 맛집 추천', tags: ['#강남역', '#점심', '#한식'], color: 'blue' },
            { chatId: 'chat_def_456', time: '오전 11:10', title: '당뇨 환자를 위한 저당분 디저트', tags: ['#건강식', '#디저트', '#저당'], color: 'green' }
        ]
    },
    {
        date: "2025년 7월 28일",
        items: [
            { chatId: 'chat_ghi_789', time: '오후 7:20', title: '성수동 분위기 좋은 와인바', tags: ['#성수동', '#와인바', '#데이트'], color: 'purple' }
        ]
    },
    {
        date: "2025년 7월 27일",
        items: [
            { chatId: 'chat_mno_345', time: '오후 12:30', title: '홍대 가성비 좋은 점심 메뉴', tags: ['#홍대', '#가성비', '#점심'], color: 'green' },
            { chatId: 'chat_stu_901', time: '오후 6:50', title: '혼밥하기 좋은 일식당 리스트', tags: ['#혼밥', '#일식', '#조용한'], color: 'purple' },
            { chatId: 'chat_pqr_678', time: '오전 10:00', title: '주말 데이트 코스, 잠실 주변', tags: ['#데이트', '#잠실', '#주말'], color: 'blue' }
        ]
    },
    {
        date: "2025년 7월 25일",
        items: [
            { chatId: 'chat_vwx_234', time: '오후 8:15', title: '부모님과 함께 갈만한 한정식집', tags: ['#가족모임', '#한정식', '#상견례'], color: 'green' },
            { chatId: 'chat_health_004', time: '오후 3:00', title: '글루텐 프리 베이커리 찾아줘', tags: ['#건강식', '#글루텐프리', '#빵집'], color: 'purple' }
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
            <h1 className="timeline-title">채팅 검색</h1>
            
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="기록의 제목을 검색해 보세요..."
                    className="search-input"
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
                                <h2 className="timeline-date">{group.date}</h2>
                            </div>
                            
                            {group.items.map((item) => (
                                <div key={item.chatId} className="timeline-item" onClick={() => handleHistoryClick(item.chatId)}>
                                    <div className="timeline-dot-wrapper">
                                        <div className={`timeline-dot dot-${item.color}`}></div>
                                    </div>
                                    <div className="timeline-card">
                                        <p className="card-time">{item.time}</p>
                                        <h3 className="card-title">{item.title}</h3>
                                        <div className="card-tags">
                                            {item.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className={`tag tag-${item.color} ${tagIndex > 0 ? 'tag-sub' : ''}`}>
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
