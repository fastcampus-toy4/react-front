import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const isComposing = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (input.trim() !== '') {
      navigate('/chat', { state: { initialMessage: input } });
    }
  };

  const handleKeyDown = (e) => {
    if (isComposing.current) {
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit(e);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="welcome-screen">
        <h1>오늘은 어떤 메뉴를 추천해드릴까요?</h1>
        <form className="welcome-input-wrapper" onSubmit={handleSubmit}>
          <textarea
            placeholder="서울시 맛집은 제가 다 꿰뚫고있어요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => (isComposing.current = true)}
            onCompositionEnd={() => (isComposing.current = false)}
            rows="1"
          />
          <button type="submit" disabled={!input.trim()} className={input.trim() !== '' ? 'active' : ''}>
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;