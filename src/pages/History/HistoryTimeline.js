import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryTimeline.css';

// SVG 아이콘 컴포넌트
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

function HistoryTimeline() {
    const [historyGroups, setHistoryGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // 백엔드에서 채팅 기록을 불러오는 로직
    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                // TODO: 로그인 기능 구현 후, 실제 user_id로 변경해야 합니다.
                const userId = 'test_user_01'; 
                
                // 백엔드에 히스토리 조회 API를 요청합니다. (이 API는 직접 만들어야 합니다)
                // const response = await fetch(`http://localhost:8000/history/${userId}`);
                // if (!response.ok) {
                //     throw new Error('대화 기록을 불러오는 데 실패했습니다.');
                // }
                // const data = await response.json();

                // --- 현재는 가상 데이터로 대체합니다. ---
                const mockData = [
                    { session_id: 'session_abc_123', created_at: '2025-07-29T14:45:00', log_type: 'user_input', content: '강남역 근처 맛집 추천' },
                    { session_id: 'session_def_456', created_at: '2025-07-29T11:10:00', log_type: 'user_input', content: '당뇨 환자를 위한 저당분 디저트' },
                    { session_id: 'session_ghi_789', created_at: '2025-07-28T19:20:00', log_type: 'user_input', content: '성수동 분위기 좋은 와인바' }
                ];
                // ------------------------------------

                // 백엔드에서 받은 데이터를 날짜별로 그룹화하는 로직
                const grouped = mockData.reduce((acc, log) => {
                    const date = new Date(log.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
                    const time = new Date(log.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });

                    if (!acc[date]) {
                        acc[date] = [];
                    }

                    // 첫 사용자 메시지를 채팅방의 제목으로 사용
                    if (!acc[date].some(item => item.chatId === log.session_id)) {
                         acc[date].push({
                            chatId: log.session_id,
                            time: time,
                            title: log.content,
                            tags: log.content.split(' ').filter(word => word.length > 1).slice(0, 3).map(tag => `#${tag}`) // 간단한 태그 생성
                        });
                    }
                    return acc;
                }, {});

                const formattedGroups = Object.keys(grouped).map(date => ({
                    date,
                    items: grouped[date]
                })).sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신 날짜순으로 정렬

                setHistoryGroups(formattedGroups);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredHistory = useMemo(() => {
        if (!searchTerm) return historyGroups;
        const lowercasedTerm = searchTerm.toLowerCase();
        return historyGroups.map(group => ({
            ...group,
            items: group.items.filter(item => item.title.toLowerCase().includes(lowercasedTerm))
        })).filter(group => group.items.length > 0);
    }, [searchTerm, historyGroups]);

    const handleHistoryClick = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    if (loading) return <div className="loading-message">대화 기록을 불러오는 중...</div>;
    if (error) return <div className="error-message">오류: {error}</div>;

    return (
        <div className="timeline-page">
            <h1>채팅 기록</h1>         
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
                    <p className="no-results">표시할 채팅 기록이 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default HistoryTimeline;