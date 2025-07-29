import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import newChatIcon from 'assets/images/newchatting.png';
import searchIcon from 'assets/images/search.png';
import libraryIcon from 'assets/images/library.png';
import loginIcon from 'assets/images/login.png';

// 임시 데이터 (나중에 실제 API 응답으로 대체될 부분)
const mockChatHistory = [
  { chatId: '1', title: '점심 메뉴 추천받은 채팅' },
  { chatId: '2', title: '저녁 분위기 좋은 데이트 장소' },
  { chatId: '3', title: '당뇨있는 팀원을 고려한 회식 장소' },
  { chatId: '4', title: '새로운 채팅입니다.' },
];

function Sidebar({ isOpen, onToggle }) {
  const sidebarClassName = isOpen ? "sidebar open" : "sidebar";

  // 1. 채팅 기록을 저장할 state 생성
  const [chatHistory, setChatHistory] = useState([]);

  // 2. 컴포넌트가 처음 로드될 때 채팅 기록을 불러오는 useEffect
  useEffect(() => {
    // 이 안에서 실제로는 fetch나 axios로 API를 호출해야 해.
    // 예: const response = await fetch('/api/chats');
    // 오늘은 임시 데이터를 사용해서 state에 저장.
    setChatHistory(mockChatHistory);
  }, []); // 뒤에 빈 배열 `[]`을 넣으면 최초 1회만 실행됨

  return (
    <div className={sidebarClassName}>
      <div className="sidebar-header">
        <button onClick={onToggle} className="toggle-button">
          <span className="button-icon">☰</span>
        </button>
      </div>

      <div className="sidebar-menu">
        <Link to="/" className="sidebar-button">
          <img src={newChatIcon} alt="새 채팅" className="button-icon-img" />
          <span className="button-text">새 채팅</span>
        </Link>
        <Link to="/history" className="sidebar-button">
          <img src={searchIcon} alt="채팅 검색" className="button-icon-img" />
          <span className="button-text">채팅 검색</span>
        </Link>
        <Link to="/repository" className="sidebar-button">
          <img src={libraryIcon} alt="맛집 추천 저장소" className="button-icon-img" />
          <span className="button-text">맛집 추천 저장소</span>
        </Link>
      </div>
      
      <div className="chat-history">
        <p className="history-title">채팅 기록</p>
        
        {/* 3. state에 저장된 chatHistory 배열을 .map()으로 돌면서 Link를 생성 */}
        {chatHistory.map((chat) => (
          <Link 
            to={`/chat/${chat.chatId}`} 
            key={chat.chatId} 
            className="sidebar-link"
          >
            <div className="history-item">
              <span className="history-item-text">{chat.title}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-button">
          <img src={loginIcon} alt="로그인" className="button-icon-img" />
          <span className="button-text">로그인</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;