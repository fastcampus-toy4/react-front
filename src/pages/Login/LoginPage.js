import React, { useState, useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios  from 'axios';
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
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % dynamicContent.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(
//       'http://155.248.175.96:8080/api/auth/login',
//       {
//         email,
//         password
//       },
//       {
//         withCredentials: true
//       }
//     );
//     console.log('로그인 성공:', response.data);
//     navigate('/');
//   } catch (err) {
//     console.error('🚨 로그인 실패!!!');
//     if (err.response) {
//       // 서버가 응답했지만 status가 2xx가 아님
//       console.error('📡 응답 상태:', err.response.status);
//       console.error('🧾 응답 데이터:', err.response.data);
//       console.error('📄 응답 헤더:', err.response.headers);
//     } else if (err.request) {
//       // 요청이 전송되었지만 응답 없음
//       console.error('⏳ 요청 보냈지만 응답 없음:', err.request);
//     } else {
//       // 요청 설정 중 오류
//       console.error('⚙️ 요청 중 오류 발생:', err.message);
//     }
//     console.error('📌 전체 에러 정보:', err.toJSON ? err.toJSON() : err);
//   }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://155.248.175.96:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        // 로그인 성공 시 홈으로 이동
        navigate('/');
      } else {
        const data = await res.json();
        alert(`로그인 실패: ${data.message || res.statusText}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

//   console.log('📝 로그인 시도 정보:', { email, password });
// };

  return (
    <div className="login-page-container"> 
     <Link to="/" className="logo">
        {/* { <img src={logoImage} alt="점메추봇 로고" /> } */}
        <h1 className="logo-text">점메추봇</h1>
     </Link>

      {/* global.css의 .card 스타일을 적용하기 위해 card 클래스를 추가합니다. */}
      <div className="card login-content-wrapper">
        <div className="login-form-container">
          <h2>LOGIN</h2>
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
            <Link to="/find-pw">비밀번호 찾기</Link>
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
