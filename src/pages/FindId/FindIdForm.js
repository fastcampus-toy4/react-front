// src/pages/FindId/FindIdForm.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FindIdForm.css';

function FindIdForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (name === '테스트' && email === 'test@test.com') {
      setResult({ success: true, message: `회원님의 아이디는 [ test_user_123 ] 입니다.` });
    } else {
      setResult({ success: false, message: '일치하는 사용자를 찾을 수 없습니다.' });
    }

    setLoading(false);
  };

  return (
    <div className="find-id-container">
      {/* 버튼 안의 텍스트를 제거했습니다. 이제 CSS로 화살표를 그립니다. */}
      <button onClick={handleGoBack} className="back-button" title="뒤로가기"></button>

      <h2>FIND ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="가입 시 등록한 이름을 입력하세요"
            required
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="가입 시 등록한 이메일을 입력하세요"
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '찾는 중...' : '아이디 찾기'}
        </button>
      </form>

      {result && (
        <div className={`result-message ${result.success ? 'success' : 'error'}`}>
          {result.message}
        </div>
      )}

      <div className="extra-links">
        <Link to="/find-password">비밀번호를 잊으셨나요?</Link>
      </div>
    </div>
  );
}

export default FindIdForm;
