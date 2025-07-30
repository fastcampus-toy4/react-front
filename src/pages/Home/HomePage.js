import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // 수정된 CSS 파일을 불러옵니다.

function HomePage() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const isComposing = useRef(false);

  const handleSubmit = (message) => {
    if (message.trim() !== '') {
      navigate('/chat', { state: { initialMessage: message } });
    }
  };

  const handleKeyDown = (e) => {
    if (isComposing.current) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    handleSubmit(suggestion);
  };

  return (
    // global.css의 body 스타일이 적용됩니다.
    <div className="home-page-container">
      {/* global.css의 .card 스타일을 적용합니다. */}
      <div className="card home-content-box">
        <div className="home-text-section">
          
          {/* h1, p 태그는 global.css에 따라 스타일이 적용됩니다. */}
          <h1>오늘 뭐 먹지?</h1>
          <p className="home-subtitle">
            서울시 맛집 탐정에게 땡기는 메뉴나 동네를 말해봐!
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }} className="home-form">
            {/* global.css의 .input-group 스타일을 적용합니다. */}
            <div className="input-group">
              <input 
                className="home-input" // 클래스 이름 변경
                placeholder="강남역 근처 파스타 맛집"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => (isComposing.current = true)}
                onCompositionEnd={() => (isComposing.current = false)}
              />
            </div>
            
            {/* global.css의 .btn, .btn-primary 스타일을 적용합니다. */}
            <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
              탐색 시작
            </button>
          </form>

          <div className="suggestion-chips-container">
            {/* global.css의 .btn, .btn-secondary 스타일을 적용합니다. */}
            <button onClick={() => handleSuggestionClick('#강남역 점심')} className="btn btn-secondary suggestion-chip">#강남역 점심</button>
            <button onClick={() => handleSuggestionClick('#혼밥하기 좋은 곳')} className="btn btn-secondary suggestion-chip">#혼밥하기 좋은 곳</button>
            <button onClick={() => handleSuggestionClick('#비 오는 날 파전')} className="btn btn-secondary suggestion-chip">#비 오는 날 파전</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
