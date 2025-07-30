import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
// import logoImage from 'assets/images/logo.png';

// 일러스트에 표시할 동적 텍스트 목록
const dynamicContent = [
  { text: "난 점메추봇이야", emoji: "🤖" },
  { text: "오늘 뭐 먹을래?", emoji: "🤔" },
  { text: "맛집 찾아줄게!", emoji: "🍜" },
  { text: "원하는 메뉴를 말해봐!", emoji: "🍣" }
];

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % dynamicContent.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
  };

  return (
    <div className="login-page-container"> 
     <Link to="/" className="logo">
        {/* { <img src={logoImage} alt="점메추봇 로고" /> } */}
        <h1 className="logo-text">점메추봇</h1>
     </Link>

      {/* global.css의 .card 스타일을 적용하기 위해 card 클래스를 추가합니다. */}
      <div className="card login-content-wrapper">
        <div className="login-form-container">
          <h2>로그인</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">이메일 주소</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary login-submit-btn">로그인</button>
          </form>
          <div className="find-links">
            <Link to="/find-id">아이디 찾기</Link>
            <span>|</span>
            <Link to="/find-password">비밀번호 찾기</Link>
          </div>
          <p className="signup-link">
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>

        <div className="login-illust-container">
          <div className="illust-emoji">
            {dynamicContent[textIndex].emoji}
          </div>
          <p className="illust-text">
            {dynamicContent[textIndex].text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
