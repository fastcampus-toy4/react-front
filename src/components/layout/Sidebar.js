import React, { useState, useEffect } from 'react';
// Link 대신 NavLink를 import 합니다.
import { NavLink, Link } from 'react-router-dom';
import './Sidebar.css';
import newChatIcon from 'assets/images/newchatting.png';
import searchIcon from 'assets/images/search.png';
import repositoryIcon from 'assets/images/repository.png';
import loginIcon from 'assets/images/login.png';

// 임시 데이터
const mockChatHistory = [
  { chatId: '1', title: '강남역 근처 맛집 추천' },
  { chatId: '2', title: '당뇨 환자를 위한 저당분 디저트' },
  { chatId: '3', title: '성수동 분위기 좋은 와인바' },
  { chatId: '4', title: '날것 못 먹는 애인과 갈 연남동 데이트 맛집' },
  { chatId: '5', title: '여의도 점심, 땅콩 알러지 동료와 함께 갈만한 곳' },
  { chatId: '6', title: '당뇨 있으신 부모님과 함께할 광화문 저녁 식사' },
  { chatId: '7', title: '삼성역 근처 고수 안 들어간 혼밥 메뉴' },
  { chatId: '8', title: '유당불내증 친구와 즐길 한남동 브런치 카페' },
  { chatId: '9', title: '고혈압이라 저염식 야식이 필요한데, 홍대 근처 추천' },
  { chatId: '10', title: '채식주의자 팀원과 함께 갈 이태원 회식 장소' },
  { chatId: '11', title: '비 오는 날, 밀가루 싫어하는 사람을 위한 종로 점심' },
  { chatId: '12', title: '위염 때문에 매운 거 못 먹는데, 압구정 건강식 저녁' },
  { chatId: '13', title: '시청 근처 오이 안 들어간 빠른 점심 메뉴' },

];

function Sidebar({ isOpen, onToggle }) {
  const sidebarClassName = isOpen ? "sidebar open" : "sidebar";
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    setChatHistory(mockChatHistory);
  }, []);

  return (
    <div className={sidebarClassName}>
      <div className="sidebar-header">
        <button onClick={onToggle} className="toggle-button">
          ☰
        </button>
      </div>

      <div className="sidebar-menu">
        {/* NavLink를 사용하여 활성화된 링크에 스타일을 적용합니다. */}
        <NavLink to="/" className="sidebar-button" end>
          <img src={newChatIcon} alt="새 채팅" className="button-icon" />
          <span className="button-text">새 채팅</span>
        </NavLink>
        <NavLink to="/history" className="sidebar-button">
          <img src={searchIcon} alt="채팅 검색" className="button-icon" />
          <span className="button-text">채팅 검색</span>
        </NavLink>
        <NavLink to="/repository" className="sidebar-button">
          <img src={repositoryIcon} alt="맛집 보관함" className="button-icon" />
          <span className="button-text">맛집 보관함</span>
        </NavLink>
      </div>
      
      <div className="chat-history">
        <h3 className="history-title">채팅 기록</h3>
        
        {chatHistory.map((chat) => (
          <NavLink 
            to={`/chat/${chat.chatId}`} 
            key={chat.chatId} 
            className="history-item"
          >
            <span className="history-item-text">{chat.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <NavLink to="/login" className="sidebar-button">
          <img src={loginIcon} alt="로그인" className="button-icon" />
          <span className="button-text">로그인</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
