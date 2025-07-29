import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import logoImage from 'assets/images/logo.png';

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
  
  // 현재 보여줄 텍스트의 인덱스를 저장할 state
  const [textIndex, setTextIndex] = useState(0);

  // 3초마다 텍스트를 바꾸기 위한 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % dynamicContent.length);
    }, 3000);

    return () => clearInterval(intervalId); // 컴포넌트가 사라질 때 인터벌 정리
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
  };

  return (
    <div className="login-page-container"> 
     <Link to="/" className="logo">
        <img src={logoImage} alt="점메추봇 로고" />
     </Link>

      <div className="login-content-wrapper">
        <div className="login-form-container">
          <h1 className="login-title">로그인</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-input-group">
              <input 
                type="email" 
                id="email" 
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="login-input-group">
              <input 
                type="password" 
                id="password" 
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="login-submit-btn">로그인</button>
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