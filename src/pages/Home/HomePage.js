// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HomePage.css'; // 수정된 CSS 파일을 불러옵니다.
//
// const API_BASE_URL = 'http://155.248.175.96:9000';
//
// function HomePage() {
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
//   const navigate = useNavigate();
//   const isComposing = useRef(false);
//
//   // const handleSubmit = (message) => {
//   //   if (message.trim() !== '') {
//   //     navigate('/chat/start', { state: { initialMessage: message } });
//   //   }
//   // };
//
//   const handleSubmit = async (message) => {
//     if (message.trim() === '' || isLoading) return;
//
//     setIsLoading(true); // 로딩 시작
//
//     try {
//       // 1. /chat/start API를 직접 호출하여 세션을 먼저 생성합니다.
//       const response = await fetch(`${API_BASE_URL}/chat/start`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // 로그인 기능 구현 후 실제 user_id 전달
//         body: JSON.stringify({ user_id: 'test_user_01' }),
//       });
//
//       if (!response.ok) {
//         throw new Error('채팅 세션을 시작하지 못했습니다.');
//       }
//
//       const data = await response.json();
//       const sessionId = data.state.session_id;
//
//       // 2. 세션 생성 성공 후, session_id와 첫 메시지를 가지고 채팅 페이지로 이동합니다.
//       navigate(`/chat/${sessionId}`, { state: { initialMessage: message, initialState: data.state } });
//
//     } catch (error) {
//       console.error("Error starting chat session:", error);
//       alert('채팅방을 만드는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
//     } finally {
//       setIsLoading(false); // 로딩 종료
//     }
//   };
//
//   const handleKeyDown = (e) => {
//     if (isComposing.current) return;
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(input);
//     }
//   };
//
//   const handleSuggestionClick = (suggestion) => {
//     handleSubmit(suggestion);
//   };
//
//   return (
//     // global.css의 body 스타일이 적용됩니다.
//     <div className="home-page-container">
//       {/* global.css의 .card 스타일을 적용합니다. */}
//       <div className="card home-content-box">
//         <div className="home-text-section">
//
//           {/* h1, p 태그는 global.css에 따라 스타일이 적용됩니다. */}
//           <h1>오늘 뭐 먹지?</h1>
//           <p className="home-subtitle">
//             서울시 맛집 탐정에게 땡기는 메뉴나 동네를 말해봐!
//           </p>
//
//           <form onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }} className="home-form">
//             {/* global.css의 .input-group 스타일을 적용합니다. */}
//             <div className="input-group">
//               <input
//                 className="home-input" // 클래스 이름 변경
//                 placeholder="강남역 근처 파스타 맛집"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 onCompositionStart={() => (isComposing.current = true)}
//                 onCompositionEnd={() => (isComposing.current = false)}
//               />
//             </div>
//
//             {/* global.css의 .btn, .btn-primary 스타일을 적용합니다. */}
//             <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
//               탐색 시작
//             </button>
//           </form>
//
//           <div className="suggestion-chips-container">
//             {/* global.css의 .btn, .btn-secondary 스타일을 적용합니다. */}
//             <button onClick={() => handleSuggestionClick('#강남역 점심')} className="btn btn-secondary suggestion-chip">#강남역 점심</button>
//             <button onClick={() => handleSuggestionClick('#혼밥하기 좋은 곳')} className="btn btn-secondary suggestion-chip">#혼밥하기 좋은 곳</button>
//             <button onClick={() => handleSuggestionClick('#비 오는 날 파전')} className="btn btn-secondary suggestion-chip">#비 오는 날 파전</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default HomePage;



import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// FastAPI 서버 주소
const API_BASE_URL = 'http://155.248.175.96:9000';

function HomePage() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const isComposing = useRef(false);

  // handleSubmit 함수를 async/await으로 변경하여 API 호출을 처리
  const handleSubmit = async (message) => {
    if (message.trim() === '' || isLoading) return;

    setIsLoading(true); // 로딩 시작

    try {
      // 1. /chat/start API를 직접 호출하여 세션을 먼저 생성합니다.
      const response = await fetch(`${API_BASE_URL}/chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 로그인 기능 구현 후 실제 user_id 전달
        body: JSON.stringify({ user_id: 'test_user_01' }),
      });

      if (!response.ok) {
        throw new Error('채팅 세션을 시작하지 못했습니다.');
      }

      const data = await response.json();
      const sessionId = data.state.session_id;

      // 2. 세션 생성 성공 후, session_id와 첫 메시지를 가지고 채팅 페이지로 이동합니다.
      navigate(`/chat/${sessionId}`, { state: { initialMessage: message, initialState: data.state } });

    } catch (error) {
      console.error("Error starting chat session:", error);
      alert('채팅방을 만드는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false); // 로딩 종료
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
    setInput(suggestion);
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

              <button type="submit" className="btn btn-primary" disabled={!input.trim() || isLoading}>
                {isLoading ? '생성 중...' : '탐색 시작'}
              </button>
            </form>

            <div className="suggestion-chips-container">
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