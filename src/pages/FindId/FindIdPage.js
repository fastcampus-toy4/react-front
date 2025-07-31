import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FindIdPage.css';

function FindIdPage() {
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

    // 가짜 서버 응답 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (name === '테스트' && email === 'test@test.com') {
      setResult({ success: true, message: `회원님의 아이디는 [ test_user_123 ] 입니다.` });
    } else {
      setResult({ success: false, message: '일치하는 사용자를 찾을 수 없습니다.' });
    }

    setLoading(false);
  };

  return (
    <div className="find-id-page-container">
      <div className="find-id-container">
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
          <Link to="/find-pw">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}

export default FindIdPage;
