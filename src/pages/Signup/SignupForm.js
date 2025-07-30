// src/pages/Signup/SignupForm.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';

// --- 코드에 넣을 더미 데이터 (가짜 유저 데이터베이스) ---
const dummyUserDB = [
  { username: 'test', email: 'test@example.com' },
  { username: 'hyojoo', email: 'hyojoo@test.com' },
  { username: 'user123', email: 'user123@test.com' },
];
// --- 더미 데이터 끝 ---

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    // --- 가짜 서버 응답 시뮬레이션 (더미 데이터 활용) ---
    console.log('가짜 서버로 회원가입 요청:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 더미 데이터베이스에서 아이디 또는 이메일 중복 확인
    const isUsernameTaken = dummyUserDB.some(user => user.username === formData.username);
    const isEmailTaken = dummyUserDB.some(user => user.email === formData.email);

    if (isUsernameTaken) {
      setError('이미 사용 중인 아이디입니다.');
    } else if (isEmailTaken) {
      setError('이미 가입된 이메일입니다.');
    } else {
      // 성공 시
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
    // --- 시뮬레이션 끝 ---

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2>CREATE ACCOUNT</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '가입하는 중...' : '회원가입'}
        </button>
      </form>

      <div className="extra-links">
        <span>이미 계정이 있으신가요? </span>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  );
}

export default SignupForm;
