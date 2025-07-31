import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FindPwPage.css';

// --- 가짜 DB ---
const dummyUserDB = [{ email: 'test@example.com' }];

function FindPwPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStep1Submit = async (e) => { e.preventDefault(); setLoading(true); setError(null); 
    await new Promise(r => setTimeout(r, 1000)); if (dummyUserDB.some(user => user.email === email)) { alert('인증번호가 발송되었습니다.'); setStep(2); } else { setError('가입되지 않은 이메일입니다.'); } setLoading(false); };
  const handleStep2Submit = async (e) => { e.preventDefault(); setLoading(true); setError(null); 
    await new Promise(r => setTimeout(r, 1000)); if (authCode === '123456') { setStep(3); } else { setError('인증번호가 올바르지 않습니다.'); } setLoading(false); };
  const handleStep3Submit = async (e) => { e.preventDefault(); setLoading(true); setError(null); 
    if (password !== confirmPassword) { setError('비밀번호가 일치하지 않습니다.'); setLoading(false); return; } await new Promise(r => setTimeout(r, 1000)); alert('비밀번호가 성공적으로 변경되었습니다.'); navigate('/login'); setLoading(false); };


  return (
    <div className="find-pw-page-container">
      <div className="card find-pw-container">
        <button onClick={handleGoBack} className="back-button" title="뒤로가기"></button>
        <h2>FIND PASSWORD</h2>
        
        {/* 1단계: 이메일 입력 */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit}>
            <p>가입 시 사용한 이메일을 입력해주세요.</p>
            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '전송 중...' : '인증번호 받기'}
            </button>
          </form>
        )}

        {/* 2단계: 인증번호 입력 */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit}>
            <p>이메일로 전송된 인증번호 6자리를 입력해주세요.</p>
            <div className="input-group">
              <label htmlFor="authCode">인증번호</label>
              <input type="text" id="authCode" value={authCode} onChange={(e) => setAuthCode(e.target.value)} required />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '확인 중...' : '인증번호 확인'}
            </button>
          </form>
        )}

        {/* 3단계: 새 비밀번호 설정 */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit}>
            <p>새로 사용할 비밀번호를 입력해주세요.</p>
            <div className="input-group">
              <label htmlFor="password">새 비밀번호</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">새 비밀번호 확인</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </form>
        )}

        <div className="extra-links">
          <Link to="/find-id">아이디 찾기</Link>
          <span>|</span>
          <Link to="/login">로그인</Link>
          </div>
      </div>
    </div>
  );
}

export default FindPwPage;
