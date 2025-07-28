import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

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
    <div className="home-page-container">
      <div className="home-content-box">
        <div className="home-text-section">
          
          <h1 className="home-title">
            오늘 뭐 먹지?
          </h1>
          <p className="home-subtitle">
            서울시 맛집 탐정에게 땡기는 메뉴나 동네를 말해봐!
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }} className="home-form">
            <div className="input-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <textarea 
              className="home-textarea"
              placeholder="강남역 근처 파스타 맛집"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => (isComposing.current = true)}
              onCompositionEnd={() => (isComposing.current = false)}
            />
            
            <button type="submit" className="submit-button" disabled={!input.trim()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </button>
          </form>

          <div className="suggestion-chips-container">
            <button onClick={() => handleSuggestionClick('#강남역 점심')} className="suggestion-chip">#강남역 점심</button>
            <button onClick={() => handleSuggestionClick('#혼밥하기 좋은 곳')} className="suggestion-chip">#혼밥하기 좋은 곳</button>
            <button onClick={() => handleSuggestionClick('#비 오는 날 파전')} className="suggestion-chip">#비 오는 날 파전</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

