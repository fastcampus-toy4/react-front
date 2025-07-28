import React from 'react';
import './RestaurantCard.css'; // 이 CSS 파일도 바로 다음에 만들 겁니다.

function RestaurantCard({ data }) {
  return (
    <div className="restaurant-card">
      {/* 이미지가 있을 경우에만 이미지 영역을 보여줍니다. */}
      {data.imageUrl && (
        <div className="card-image-wrapper">
          <img src={data.imageUrl} alt={data.name} className="card-image" />
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">{data.name}</h3>
        <p className="card-category">{data.category}</p>
        <p className="card-address">{data.address}</p>
        <a href={data.mapLink} target="_blank" rel="noopener noreferrer" className="card-map-link">
          지도에서 보기 →
        </a>
      </div>
    </div>
  );
}

export default RestaurantCard;