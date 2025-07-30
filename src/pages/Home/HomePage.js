import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // 수정된 CSS 파일을 불러옵니다.

// 백엔드에서 가져올 전체 키워드 목록이라고 가정하는 가상 데이터
const allKeywords = [
  '#강남역 점심', '#혼밥하기 좋은 곳', '#비 오는 날 파전', '#성수동 데이트',
  '#가성비 맛집', '#특별한 날', '#조용한 카페', '#홍대 디저트'
];

function HomePage() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]); // 화면에 보여줄 추천 키워드
  const navigate = useNavigate();
  const isComposing = useRef(false);

  // 컴포넌트가 처음 로드될 때 (새로고침 시) 키워드를 랜덤으로 섞어서 3개만 보여주는 로직
  useEffect(() => {
    // 배열을 랜덤으로 섞는 함수 (Fisher-Yates Shuffle)
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // --- 나중에 이 부분을 실제 API 호출 코드로 바꾸면 돼! ---
    // 1. 전체 키워드 목록을 섞는다.
    const shuffledKeywords = shuffle([...allKeywords]);
    // 2. 섞인 목록에서 앞에서 3개만 잘라서 state에 저장한다.
    setSuggestions(shuffledKeywords.slice(0, 3));
    
    /*
    // << 실제 API 연동 예시 >>
    const fetchKeywords = async () => {
      try {
        // const response = await fetch('http://localhost:8080/api/keywords/random');
        // const data = await response.json();
        // setSuggestions(data); // 백엔드가 랜덤으로 3개를 보내준다고 가정
      } catch (error) {
        console.error("키워드를 불러오는 데 실패했습니다:", error);
      }
    };
    fetchKeywords();
    */
   // --- 여기까지 ---

  }, []); // 빈 배열 `[]`을 넣으면 최초 1회만 실행됨


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
      <div className="card home-content-box">
        <div className="home-text-section">
          
          <h1>오늘 뭐 먹지?</h1>
          <p className="home-subtitle">
            서울시 맛집 탐정에게 땡기는 메뉴나 동네를 말해봐!
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }} className="home-form">
            <div className="input-group">
              <input 
                className="home-input"
                placeholder="강남역 근처 파스타 맛집"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => (isComposing.current = true)}
                onCompositionEnd={() => (isComposing.current = false)}
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
              탐색 시작
            </button>
          </form>

          <div className="suggestion-chips-container">
            {/* state에 저장된 랜덤 키워드를 버튼으로 만듭니다. */}
            {suggestions.map(keyword => (
              <button 
                key={keyword}
                onClick={() => handleSuggestionClick(keyword)} 
                className="btn btn-secondary suggestion-chip"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;