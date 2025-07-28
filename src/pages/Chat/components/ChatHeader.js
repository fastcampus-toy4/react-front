import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from 'assets/images/logo.png';

function ChatHeader() {
  return (
    <header className="chat-header">
      <Link to="/" className="logo">
        <img src={logoImage} alt="점메추봇 로고" />
      </Link>
    </header>
  );
}

export default ChatHeader;