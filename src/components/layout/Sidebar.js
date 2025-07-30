import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import newChatIcon from 'assets/images/newchatting.png';
import searchIcon from 'assets/images/search.png';
import repositoryIcon from 'assets/images/repository.png';
import loginIcon from 'assets/images/login.png';

// 임시 데이터
const mockChatHistory = [
  { chatId: '1', title: '점심 메뉴 추천받은 채팅' },
  { chatId: '2', title: '저녁 분위기 좋은 데이트 장소' },
  { chatId: '3', title: '당뇨있는 팀원을 고려한 회식 장소' },
  { chatId: '4', title: '새로운 채팅입니다.' },
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
        <Link to="/" className="sidebar-button">
          <img src={newChatIcon} alt="새 채팅" className="button-icon" />
          <span className="button-text">새 채팅</span>
        </Link>
        <Link to="/history" className="sidebar-button">
          <img src={searchIcon} alt="채팅 검색" className="button-icon" />
          <span className="button-text">채팅 검색</span>
        </Link>
        <Link to="/repository" className="sidebar-button">
          <img src={repositoryIcon} alt="맛집 보관함" className="button-icon" />
          <span className="button-text">맛집 보관함</span>
        </Link>
      </div>
      
      <div className="chat-history">
        <h3 className="history-title">채팅 기록</h3>
        
        {chatHistory.map((chat) => (
          <Link 
            to={`/chat/${chat.chatId}`} 
            key={chat.chatId} 
            className="history-item"
          >
            <span className="history-item-text">{chat.title}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-button">
          <img src={loginIcon} alt="로그인" className="button-icon" />
          <span className="button-text">로그인</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
