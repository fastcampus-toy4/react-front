import React, { useState, useEffect, useRef } from 'react';
import './Repository.css'; // 전용 CSS 파일을 불러옵니다.

// --- 가상 데이터 (총 10개로 확장) ---
const initialItemsData = [
    { id: 1, title: '몽탄', menu: '우대갈비, 짚불 삼겹살, 된장찌개', hours: '12:00 - 22:00', address: '서울 용산구 한강대로81길 14', mapUrl: 'https://naver.me/F4Q7gZ1z', isLiked: true },
    { id: 2, title: '금돼지식당', menu: '본삼겹, 눈꽃목살, 김치찌개', hours: '11:30 - 23:00', address: '서울 중구 다산로 149', mapUrl: 'https://naver.me/5J2bB5bJ', isLiked: true },
    { id: 3, title: '런던 베이글 뮤지엄', menu: '포테이토 치즈 베이글, 쪽파 프레첼', hours: '08:00 - 18:00', address: '서울 종로구 북촌로4길 20', mapUrl: 'https://naver.me/xK7bA5bJ', isLiked: true },
    { id: 4, title: '다운타우너', menu: '아보카도 버거, 갈릭버터 프라이즈', hours: '11:30 - 21:30', address: '서울 송파구 백제고분로45길 3', mapUrl: 'https://naver.me/5J2bB5bJ', isLiked: true },
    { id: 5, title: '진대감', menu: '한우차돌삼합, 날치알 볶음밥', hours: '11:30 - 22:00', address: '서울 강남구 학동로 335', mapUrl: 'https://naver.me/xK7bA5bJ', isLiked: true },
    { id: 6, title: '어글리베이커리', menu: '감동의 대파빵, 맘모스빵', hours: '12:00 - 21:00', address: '서울 마포구 월드컵로13길 73', mapUrl: 'https://naver.me/5J2bB5bJ', isLiked: true },
    { id: 7, title: '카멜커피', menu: '카멜커피, 앙버터', hours: '10:30 - 19:30', address: '서울 성동구 성수이로7길 26', mapUrl: 'https://naver.me/xK7bA5bJ', isLiked: true },
    { id: 8, title: '깡통만두', menu: '칼만두, 비빔국수', hours: '11:30 - 21:00', address: '서울 종로구 북촌로2길 5-6', mapUrl: 'https://naver.me/5J2bB5bJ', isLiked: true },
    { id: 9, title: '미엔아이', menu: '우육면, 마약차오판', hours: '11:30 - 21:00', address: '서울 마포구 동교로 267', mapUrl: 'https://naver.me/xK7bA5bJ', isLiked: true },
    { id: 10, title: '오제제', menu: '안심 돈카츠, 자루우동', hours: '11:00 - 21:00', address: '서울 용산구 한강대로 100', mapUrl: 'https://naver.me/5J2bB5bJ', isLiked: true },
];
const allKeywords = ['#매콤한', '#따끈한', '#분위기있는', '#가성비최고', '#혼밥가능', '#디저트맛집'];
// --- 가상 데이터 끝 ---

const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="heart-icon"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg> );

const FolderCard = ({ item, isExpanded, onExpand, onLikeToggle }) => {
    return (
        // isLiked가 false이면 'deleting' 클래스를 추가하여 삭제 대기 상태임을 알립니다.
        <div className={`card repository-card ${isExpanded ? 'expanded' : ''} ${!item.isLiked ? 'deleting' : ''}`} onClick={onExpand}>
            <div className="card-header">
                <h3>{item.title}</h3>
                <button className={`like-btn ${item.isLiked ? 'liked' : ''}`} onClick={(e) => { e.stopPropagation(); onLikeToggle(item.id); }}>
                    <HeartIcon />
                </button>
            </div>
            <p className="card-menu">메뉴: {item.menu}</p>
            <div className="card-details">
                <p><strong>영업시간:</strong> {item.hours}</p>
                <p><strong>주소:</strong> {item.address}</p>
                <a href={item.mapUrl} className="map-link" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                    네이버 지도로 보기
                </a>
            </div>
        </div>
    );
};

function Repository() {
    const [items, setItems] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [expandedCards, setExpandedCards] = useState({});
    const deletionTimers = useRef({});

    useEffect(() => {
        setItems(initialItemsData);
        getRandomKeywords();
        const timers = deletionTimers.current;
        return () => {
            Object.values(timers).forEach(clearTimeout);
        };
    }, []);

    const handleLikeToggle = (id) => {
        const itemToToggle = items.find(item => item.id === id);
        if (!itemToToggle) return;

        const newIsLiked = !itemToToggle.isLiked;
        // isLiked 상태를 먼저 UI에 반영하여 하트 색상을 즉시 변경합니다.
        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, isLiked: newIsLiked } : item));

        if (!newIsLiked) {
            // "좋아요"를 취소하면, 2.5초 후에 실제로 목록에서 삭제하는 타이머를 설정합니다.
            const timerId = setTimeout(() => {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
                delete deletionTimers.current[id]; // 타이머 정리
            }, 2500);
            deletionTimers.current[id] = timerId;
        } else {
            if (deletionTimers.current[id]) {
                clearTimeout(deletionTimers.current[id]);
                delete deletionTimers.current[id];
            }
        }
    };

    // 이 함수는 각 카드의 ID를 키로 사용하여 열림/닫힘 상태를 개별적으로 관리합니다.
    // 따라서 한 카드만 열리게 됩니다.
    const handleExpandCard = (id) => { 
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] })); 
    };
    
    const getRandomKeywords = () => { const shuffled = [...allKeywords].sort(() => 0.5 - Math.random()); setKeywords(shuffled.slice(0, 5)); };
    const handleRefreshKeywords = () => { getRandomKeywords(); };

    const initialShowCount = 6;
    const visibleItems = showMore ? items : items.slice(0, initialShowCount);

    return (
        <div className="repository-page">
            <div className="background-graphic accent-bg"></div>
            <div className="background-graphic primary-circle"></div>

            <div className="keyword-section">
                <h2>TODAY'S KEYWORD</h2>
                <div className="keyword-header">
                    <div className="keyword-list">
                        {keywords.map(keyword => (
                            <span key={keyword} className="keyword-tag">{keyword}</span>
                        ))}
                    </div>
                    <button className="refresh-btn" onClick={handleRefreshKeywords}>
                      🔄
                    </button>
                </div>
            </div>

            <hr className="section-divider" />

            <h1>LIKED LIST</h1>
            
            <div className="card-grid">
                {visibleItems.map(item => (
                    <FolderCard
                        key={item.id}
                        item={item}
                        isExpanded={!!expandedCards[item.id]}
                        onExpand={() => handleExpandCard(item.id)}
                        onLikeToggle={handleLikeToggle}
                    />
                ))}
            </div>
            
            {items.length > initialShowCount && (
                <div className="see-more-container">
                    <button className="btn btn-secondary" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'CLOSE' : 'SEE MORE'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Repository;
