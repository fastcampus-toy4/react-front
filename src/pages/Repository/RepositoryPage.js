import React, { useState, useEffect } from 'react';
import './Repository.css';

// --- 가상 데이터 (API 연동 전 테스트용) ---
const initialLikedRestaurants = [
  { id: 1, name: '오복수산', menu: '카이센동, 우니동', hours: '11:30 - 21:30', address: '서울 강남구 테헤란로 123', mapUrl: 'https://naver.me/...' },
  { id: 2, name: '진대감', menu: '차돌삼합, 묵사발', hours: '12:00 - 22:00', address: '서울 마포구 합정동 456', mapUrl: 'https://naver.me/...' },
  { id: 3, name: '강남교자', menu: '칼국수, 만두', hours: '10:30 - 21:00', address: '서울 서초구 강남대로 789', mapUrl: 'https://naver.me/...' },
  { id: 4, name: '을밀대', menu: '평양냉면, 녹두전', hours: '11:00 - 22:00', address: '서울 마포구 염리동 12', mapUrl: 'https://naver.me/...' },
  { id: 5, name: '몽탄', menu: '우대갈비, 짚불삼겹살', hours: '12:00 - 22:00', address: '서울 용산구 한강로 34', mapUrl: 'https://naver.me/...' },
  { id: 6, name: '더 키친 살바토레', menu: 'D.O.C 피자', hours: '11:30 - 22:00', address: '서울 강남구 압구정로 456', mapUrl: 'https://naver.me/...' },
];

const initialKeywords = ['#강남역맛집', '#비오는날☔️', '#데이트하기좋은', '#가성비최고', '#웨이팅필수🔥'];
// --- 가상 데이터 끝 ---


function Repository() { 
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    setLikedRestaurants(initialLikedRestaurants);
    setKeywords(initialKeywords);
  }, []);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setLikedRestaurants(likedRestaurants.filter(r => r.id !== id));
    }
  };

  return (
    <div className="repository-page"> 
      <section className="repository-section">
        <h2 className="section-title">❤️ 좋아요 목록</h2>
        <div className="card-list-horizontal">
          {likedRestaurants.slice(0, 5).map(r => (
            <div 
              key={r.id} 
              className={`restaurant-card ${expandedCard === r.id ? 'expanded' : ''}`}
              onClick={() => handleCardClick(r.id)}
            >
              <div className="card-header">
                <h3>{r.name}</h3>
                <button className="delete-btn" onClick={(e) => handleDelete(e, r.id)}>×</button>
              </div>
              <p className="card-menu">{r.menu}</p>
              <div className="card-details">
                <p><strong>영업시간:</strong> {r.hours}</p>
                <p><strong>주소:</strong> {r.address}</p>
                <a href={r.mapUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  네이버 지도로 보기
                </a>
              </div>
            </div>
          ))}
          {likedRestaurants.length > 5 && <button className="see-more-btn">더보기</button>}
        </div>
      </section>

      <section className="repository-section">
        <div className="section-header">
          <h2 className="section-title">✨ 키워드 추천</h2>
          <button className="refresh-btn">새로고침</button>
        </div>
        <div className="keyword-list">
          {keywords.map(keyword => (
            <button key={keyword} className="keyword-btn">{keyword}</button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Repository;