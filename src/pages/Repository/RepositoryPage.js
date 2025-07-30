import React, { useState, useEffect, useRef } from 'react';
import './Repository.css'; // 전용 CSS 파일을 불러옵니다.

// --- 가상 데이터 ---
const initialItemsData = [
    { id: 1, title: '몽탄', menu: '우대갈비, 짚불 삼겹살, 된장찌개', hours: '12:00 - 22:00', address: '서울 용산구 한강대로81길 14', mapUrl: '#', isLiked: true },
    { id: 2, title: '금돼지식당', menu: '본삼겹, 눈꽃목살, 김치찌개', hours: '11:30 - 23:00', address: '서울 중구 다산로 149', mapUrl: '#', isLiked: true },
    { id: 3, title: '런던 베이글 뮤지엄', menu: '포테이토 치즈 베이글, 쪽파 프레첼', hours: '08:00 - 18:00', address: '서울 종로구 북촌로4길 20', mapUrl: '#', isLiked: true },
    { id: 4, title: '다운타우너', menu: '아보카도 버거, 갈릭버터 프라이즈', hours: '11:30 - 21:30', address: '서울 송파구 백제고분로45길 3', mapUrl: '#', isLiked: true },
    { id: 5, title: '진대감', menu: '한우차돌삼합, 날치알 볶음밥', hours: '11:30 - 22:00', address: '서울 강남구', mapUrl: '#', isLiked: true },
    { id: 6, title: '어글리베이커리', menu: '감동의 대파빵, 맘모스빵', hours: '12:00 - 21:00', address: '서울 마포구', mapUrl: '#', isLiked: true },
];
const allKeywords = ['#매콤한', '#따끈한', '#분위기있는', '#가성비최고', '#혼밥가능', '#디저트맛집'];
// --- 가상 데이터 끝 ---

const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="heart-icon"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg> );

const FolderCard = ({ item, isExpanded, onExpand, onLikeToggle }) => {
    return (
        // global.css의 .card 클래스를 사용하고, 레이아웃을 위한 repository-card 클래스를 추가합니다.
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
        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, isLiked: newIsLiked } : item));

        if (!newIsLiked) {
            const timerId = setTimeout(() => {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
            }, 2500);
            deletionTimers.current[id] = timerId;
        } else {
            if (deletionTimers.current[id]) {
                clearTimeout(deletionTimers.current[id]);
                delete deletionTimers.current[id];
            }
        }
    };

    const getRandomKeywords = () => { const shuffled = [...allKeywords].sort(() => 0.5 - Math.random()); setKeywords(shuffled.slice(0, 5)); };
    const handleExpandCard = (id) => { setExpandedCards(prev => ({ ...prev, [id]: !prev[id] })); };
    const handleRefreshKeywords = () => { getRandomKeywords(); };

    const initialShowCount = 6;
    const visibleItems = showMore ? items : items.slice(0, initialShowCount);

    return (
        <div className="repository-page">
            {/* 팝아트 스타일 배경 그래픽 */}
            <div className="background-graphic accent-bg"></div>
            <div className="background-graphic primary-circle"></div>

            <h1>SAVED LIST</h1>
            
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
                    {/* global.css의 .btn, .btn-secondary 클래스를 사용합니다. */}
                    <button className="btn btn-secondary" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'CLOSE' : 'SEE MORE'}
                    </button>
                </div>
            )}
            
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
        </div>
    );
}

export default Repository;
