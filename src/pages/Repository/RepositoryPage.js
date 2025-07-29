import React, { useState, useEffect } from 'react';
import './Repository.css'; // 전용 CSS 파일을 불러옵니다.

// --- 가상 데이터 (title을 실제 식당 이름으로 수정) ---
const initialItemsData = [
    { 
      id: 1, 
      title: '몽탄', 
      menu: '우대갈비, 짚불 삼겹살, 된장찌개', 
      hours: '12:00 - 22:00', 
      address: '서울 용산구 한강대로81길 14', 
      mapUrl: 'https://naver.me/xakzept', 
      isLiked: true 
    },
    { 
      id: 2, 
      title: '금돼지식당', 
      menu: '본삼겹, 눈꽃목살, 김치찌개', 
      hours: '11:30 - 23:00 (라스트오더 22:15)', 
      address: '서울 중구 다산로 149', 
      mapUrl: 'https://naver.me/F4QJ2S7g', 
      isLiked: true 
    },
    { 
      id: 3, 
      title: '런던 베이글 뮤지엄 안국점', 
      menu: '포테이토 치즈 베이글, 플레인 베이글, 쪽파 프레첼', 
      hours: '08:00 - 18:00', 
      address: '서울 종로구 북촌로4길 20', 
      mapUrl: 'https://naver.me/xevkZ86P', 
      isLiked: true 
    },
    { 
      id: 4, 
      title: '다운타우너 잠실점', 
      menu: '아보카도 버거, 해쉬브라운 버거, 갈릭버터 프라이즈', 
      hours: '11:30 - 21:30 (라스트오더 20:30)', 
      address: '서울 송파구 백제고분로45길 3', 
      mapUrl: 'https://naver.me/Gf9v7n5g', 
      isLiked: true 
    },
    { 
      id: 5, 
      title: '진대감 논현본점', 
      menu: '한우차돌삼합, 갓김치, 날치알 볶음밥', 
      hours: '11:30 - 22:00 (브레이크타임 15:00-17:00)', 
      address: '서울 강남구 학동로38길 38', 
      mapUrl: 'https://naver.me/G1vA7L4L', 
      isLiked: true 
    },
    { 
      id: 6, 
      title: '어글리베이커리', 
      menu: '감동의 대파빵, 맘모스빵, 각종 크림빵', 
      hours: '12:00 - 21:00 (소진 시 마감, 월/화 휴무)', 
      address: '서울 마포구 월드컵로13길 73', 
      mapUrl: 'https://naver.me/5QTm6GzT', 
      isLiked: true 
    },
    { 
      id: 7, 
      title: '소신이쏘 신촌본점', 
      menu: '크림 소갈비찜, 매운 소갈비찜(1~4단계)', 
      hours: '12:00 - 22:00 (브레이크타임 15:00-17:00)', 
      address: '서울 서대문구 연세로5가길 19', 
      mapUrl: 'https://naver.me/5jJ02Y1Y', 
      isLiked: true 
    },
    { 
      id: 8, 
      title: '카멜커피 7호점', 
      menu: '카멜커피(시그니처), 앙버터, 플랫화이트', 
      hours: '11:00 - 21:00', 
      address: '서울 성동구 서울숲7길 4', 
      mapUrl: 'https://naver.me/5FYd7N6N', 
      isLiked: true 
    }
];

const allKeywords = ['#매콤한', '#따끈한', '#분위기있는', '#가성비최고', '#혼밥가능', '#디저트맛집', '#웨이팅필수', '#신상맛집', '#야경맛집', '#해장', '#특별한날', '#단체모임'];
// --- 가상 데이터 끝 ---

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="heart-icon">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const FolderCard = ({ item, isExpanded, onExpand, onLikeToggle }) => {
    return (
        <div className={`folder-card ${isExpanded ? 'expanded' : ''}`} onClick={onExpand}>
            <div className="card-header">
                <h2 className="card-title">{item.title}</h2>
                <button className={`like-btn ${item.isLiked ? 'liked' : ''}`} onClick={(e) => {
                    e.stopPropagation();
                    onLikeToggle(item.id);
                }}>
                    <HeartIcon />
                </button>
            </div>
            {/* ▼▼▼ 가로 배치를 위한 래퍼 추가 ▼▼▼ */}
            <div className="card-body-wrapper">
                <p className="card-menu">메뉴: {item.menu}</p>
                <div className="card-details">
                    <p><strong>영업시간:</strong> {item.hours}</p>
                    <p><strong>주소:</strong> {item.address}</p>
                    <a href={item.mapUrl} className="map-link" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                        네이버 지도로 보기
                    </a>
                </div>
            </div>
        </div>
    );
};

function Repository() {
    const [items, setItems] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [expandedCards, setExpandedCards] = useState({});

    const getRandomKeywords = () => {
        const shuffled = [...allKeywords].sort(() => 0.5 - Math.random());
        setKeywords(shuffled.slice(0, 5)); // 키워드 5개로 수정
    };

    useEffect(() => {
        // 처음 로드 시 isLiked가 true인 항목만 가져옵니다.
        setItems(initialItemsData.filter(item => item.isLiked));
        getRandomKeywords();
    }, []);

    const handleExpandCard = (id) => {
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };
    
    const handleLikeToggle = (id) => {
        // 아이템을 즉시 삭제하는 대신 isLiked 상태만 변경합니다.
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, isLiked: !item.isLiked } : item
            )
        );
    };

    const handleRefreshKeywords = () => {
        getRandomKeywords();
    };

    const initialShowCount = 6; // 기본 3x2 그리드
    // isLiked가 true인 항목만 필터링해서 보여줍니다.
    const likedItems = items.filter(item => item.isLiked);
    const visibleItems = showMore ? likedItems : likedItems.slice(0, initialShowCount);

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
                    
                    {likedItems.length > initialShowCount && (
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
