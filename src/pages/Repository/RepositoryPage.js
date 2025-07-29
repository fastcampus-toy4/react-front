import React, { useState, useEffect, useRef } from 'react';
import './Repository.css';

// --- 가상 데이터 (동일, 생략) ---
const initialItemsData = [
    { id: 1, title: '몽탄', menu: '우대갈비, 짚불 삼겹살', hours: '12:00 - 22:00', address: '서울 용산구', mapUrl: '#', isLiked: true },
    { id: 2, title: '금돼지식당', menu: '본삼겹, 눈꽃목살', hours: '11:30 - 23:00', address: '서울 중구', mapUrl: '#', isLiked: true },
    { id: 3, title: '런던 베이글 뮤지엄', menu: '포테이토 치즈 베이글, 쪽파 프레첼', hours: '08:00 - 18:00', address: '서울 종로구', mapUrl: '#', isLiked: true },
    { id: 4, title: '다운타우너', menu: '아보카도 버거, 갈릭버터 프라이즈', hours: '11:30 - 21:30', address: '서울 송파구', mapUrl: '#', isLiked: true },
    { id: 5, title: '진대감', menu: '한우차돌삼합, 날치알 볶음밥', hours: '11:30 - 22:00', address: '서울 강남구', mapUrl: '#', isLiked: true },
    { id: 6, title: '어글리베이커리', menu: '감동의 대파빵, 맘모스빵', hours: '12:00 - 21:00', address: '서울 마포구', mapUrl: '#', isLiked: true },
    { id: 7, title: '소신이쏘', menu: '크림 소갈비찜, 매운 소갈비찜', hours: '12:00 - 22:00', address: '서울 서대문구', mapUrl: '#', isLiked: true },
    { id: 8, title: '카멜커피', menu: '카멜커피(시그니처), 앙버터', hours: '11:00 - 21:00', address: '서울 성동구', mapUrl: '#', isLiked: true }
];
const allKeywords = ['#매콤한', '#따끈한', '#분위기있는', '#가성비최고', '#혼밥가능', '#디저트맛집', '#웨이팅필수', '#신상맛집'];

// --- Icon, FolderCard 컴포넌트 (동일, 생략) ---
const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="heart-icon"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg> );
const FolderCard = ({ item, isExpanded, onExpand, onLikeToggle }) => { return ( <div className={`folder-card ${isExpanded ? 'expanded' : ''} ${!item.isLiked ? 'deleting' : ''}`} onClick={onExpand}><div className="card-header"><h2 className="card-title">{item.title}</h2><button className={`like-btn ${item.isLiked ? 'liked' : ''}`} onClick={(e) => { e.stopPropagation(); onLikeToggle(item.id); }}><HeartIcon /></button></div><div className="card-body-wrapper"><p className="card-menu">메뉴: {item.menu}</p><div className="card-details"><p><strong>영업시간:</strong> {item.hours}</p><p><strong>주소:</strong> {item.address}</p><a href={item.mapUrl} className="map-link" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">네이버 지도로 보기</a></div></div></div> ); };

function Repository() {
    const [items, setItems] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [expandedCards, setExpandedCards] = useState({});
    
    // 삭제 예정인 카드의 타이머 ID를 관리하기 위한 ref
    const deletionTimers = useRef({});

    useEffect(() => {
        setItems(initialItemsData);
        getRandomKeywords();
        
        // ref의 current 값을 effect 내부의 상수로 복사합니다.
        const timers = deletionTimers.current;
        
        // 컴포넌트가 사라질 때 실행되는 정리 함수
        return () => {
            // 이제 외부 ref가 아닌 effect 내부의 상수를 사용합니다.
            Object.values(timers).forEach(clearTimeout);
        };
    }, []);

    const handleLikeToggle = (id) => {
        const itemToToggle = items.find(item => item.id === id);
        if (!itemToToggle) return;

        // "좋아요" 상태를 토글
        const newIsLiked = !itemToToggle.isLiked;
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isLiked: newIsLiked } : item
            )
        );

        if (!newIsLiked) {
            // "좋아요"를 해제한 경우 (삭제 예정 상태)
            // 3초 후 실행될 삭제 타이머를 설정하고, 타이머 ID를 저장
            const timerId = setTimeout(() => {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
            }, 2500);
            deletionTimers.current[id] = timerId;
        } else {
            // 다시 "좋아요"를 누른 경우 (삭제 취소)
            // 저장해둔 삭제 타이머가 있다면 취소
            if (deletionTimers.current[id]) {
                clearTimeout(deletionTimers.current[id]);
                delete deletionTimers.current[id]; // 타이머 정보 삭제
            }
        }
    };

    // (다른 함수들은 이전과 동일하여 생략)
    const getRandomKeywords = () => { const shuffled = [...allKeywords].sort(() => 0.5 - Math.random()); setKeywords(shuffled.slice(0, 5)); };
    const handleExpandCard = (id) => { setExpandedCards(prev => ({ ...prev, [id]: !prev[id] })); };
    const handleRefreshKeywords = () => { getRandomKeywords(); };


    const initialShowCount = 6;
    const visibleItems = showMore ? items : items.slice(0, initialShowCount);

    return (
        <div className="folder-bg">
            <h1 className="main-title">맛집 보관함</h1>
            <div className="folder-wrapper">
                <div className="folder-tabs">
                    <div className="folder-tab active">
                        <h2>📌 저장된 맛집</h2>
                    </div>
                </div>
                <div className="folder-container">
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
                            <button onClick={() => setShowMore(!showMore)}>
                                {showMore ? '간단히 보기' : '더보기'}
                            </button>
                        </div>
                    )}
                    
                    <div className="keyword-section">
                        <div className="keyword-header">
                            <h3>오늘의 추천 키워드</h3>
                            <button className="refresh-btn" onClick={handleRefreshKeywords}>
                              🔄
                            </button>
                        </div>
                         <div className="keyword-list">
                            {keywords.map(keyword => (
                                <button key={keyword}>{keyword}</button>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Repository;
