import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import newChatIcon from 'assets/images/newchatting.png';
import searchIcon from 'assets/images/search.png';
import libraryIcon from 'assets/images/library.png';
import loginIcon from 'assets/images/login.png';

function Sidebar({ isOpen, onToggle }) {
  const sidebarClassName = isOpen ? "sidebar open" : "sidebar";

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
        <Link to="/search" className="sidebar-button">
          <img src={searchIcon} alt="채팅 검색" className="button-icon-img" />
          <span className="button-text">채팅 검색</span>
        </Link>
        <Link to="/library" className="sidebar-button">
          <img src={libraryIcon} alt="라이브러리" className="button-icon-img" />
          <span className="button-text">라이브러리</span>
        </Link>
      </div>

      <div className="chat-history">
        <p className="history-title">채팅 기록</p>
        <Link to="/chat/1" className="sidebar-link">
          <div className="history-item">
            <span className="history-item-text">점심 메뉴 추천받은 채팅</span>
          </div>
        </Link>
        <Link to="/chat/2" className="sidebar-link">
          <div className="history-item">
            <span className="history-item-text">저녁 분위기 좋은 데이트 장소</span>
          </div>
        </Link>
        <Link to="/chat/3" className="sidebar-link">
          <div className="history-item">
            <span className="history-item-text">당뇨있는 팀원을 고려한 회식 장소</span>
          </div>
        </Link>
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