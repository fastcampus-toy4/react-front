// import React, { useState, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HomePage.css';
//
// // FastAPI 서버 주소
// const API_BASE_URL = 'http://localhost:9000';
//
// function HomePage() {
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const isComposing = useRef(false);
//
//   // API 호출 및 페이지 이동을 처리하는 로직
//   const startChatAndNavigate = useCallback(async (message) => {
//     if (message.trim() === '' || isLoading) return;
//
//     setIsLoading(true);
//
//     try {
//       // 1. /chat/start API를 호출하여 세션 생성
//       const response = await fetch(`${API_BASE_URL}/chat/start`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // 초기 메시지와 사용자 ID를 함께 전달
//         body: JSON.stringify({
//           user_id: 'test_user_01',
//           initial_message: message
//         }),
//       });
//
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || '채팅 세션을 시작하지 못했습니다.');
//       }
//
//       const data = await response.json();
//       // 서버가 'state' 키로 응답하므로, data.state에서 session_id를 가져옴
//       const sessionId = data.state.session_id;
//
//       // 2. 성공 시, 채팅 페이지로 필요한 정보와 함께 이동
//       navigate(`/chat/${sessionId}`, {
//         state: {
//           initialState: data.state,       // 서버가 준 전체 상태
//           initialMessage: message       // 사용자가 입력한 첫 메시지
//         }
//       });
//
//     } catch (error) {
//       console.error("Error starting chat session:", error);
//       alert('채팅방을 만드는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isLoading, navigate]); // 의존성 배열
//
//   // --- UI와 관련된 이벤트 핸들러들 ---
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     startChatAndNavigate(input);
//   };
//
//   const handleSuggestionClick = (suggestion) => {
//     setInput(suggestion);
//     startChatAndNavigate(suggestion);
//   };
//
//   const handleKeyDown = (e) => {
//     if (isComposing.current) return;
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       startChatAndNavigate(input);
//     }
//   };
//
//   // --- 화면에 그릴 UI (JSX) ---
//   return (
//       <div className="home-page-container">
//         <div className="card home-content-box">
//           <div className="home-text-section">
//             <h1>오늘 뭐 먹지?</h1>
//             <p className="home-subtitle">
//               서울시 맛집 탐정에게 땡기는 메뉴나 동네를 말해봐!
//             </p>
//             <form onSubmit={handleSubmit} className="home-form">
//               <div className="input-group">
//                 <input
//                     className="home-input"
//                     placeholder="강남역 근처 파스타 맛집"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     onCompositionStart={() => (isComposing.current = true)}
//                     onCompositionEnd={() => (isComposing.current = false)}
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary" disabled={!input.trim() || isLoading}>
//                 {isLoading ? '생성 중...' : '탐색 시작'}
//               </button>
//             </form>
//             <div className="suggestion-chips-container">
//               <button onClick={() => handleSuggestionClick('#강남역 점심')} className="btn btn-secondary suggestion-chip">#강남역 점심</button>
//               <button onClick={() => handleSuggestionClick('#혼밥하기 좋은 곳')} className="btn btn-secondary suggestion-chip">#혼밥하기 좋은 곳</button>
//               <button onClick={() => handleSuggestionClick('#비 오는 날 파전')} className="btn btn-secondary suggestion-chip">#비 오는 날 파전</button>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// }
//
// export default HomePage;


import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// [중요] 사용하시는 API 서버 주소로 설정하세요.
const API_BASE_URL = 'http://localhost:9000';

function HomePage() {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const isComposing = useRef(false);

    // API 호출 및 페이지 이동을 처리하는 로직
    const startChatAndNavigate = useCallback(async (message) => {
        if (message.trim() === '' || isLoading) return;
        setIsLoading(true);

        try {
            // 1. /chat/start API를 호출하여 세션 생성 및 첫 메시지 처리 요청
            const response = await fetch(`${API_BASE_URL}/chat/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: 'test_user_01', // 로그인 구현 후 실제 ID로 변경
                    initial_message: message
                }),
            });

            if (!response.ok) {
                // 서버에서 온 에러 메시지를 최대한 활용
                const errorData = await response.json().catch(() => ({ detail: '서버 응답을 처리할 수 없습니다.' }));
                throw new Error(errorData.detail || '채팅 세션을 시작하지 못했습니다.');
            }

            const data = await response.json();
            const sessionId = data.state.session_id;

            // 2. 성공 시, 백엔드가 처리한 첫 대화 상태(initialState)를 가지고 채팅 페이지로 이동
            navigate(`/chat/${sessionId}`, { state: { initialState: data.state } });

        } catch (error) {
            console.error("Error starting chat session:", error);
            alert(error.message); // 사용자에게 구체적인 에러 메시지 표시
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, navigate]);

    // --- UI와 관련된 이벤트 핸들러들 ---
    const handleSubmit = (e) => {
        e.preventDefault();
        startChatAndNavigate(input);
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        startChatAndNavigate(suggestion);
    };

    const handleKeyDown = (e) => {
        if (isComposing.current) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            startChatAndNavigate(input);
        }
    };

    // --- 화면에 그릴 UI (JSX) ---
    return (
        <div className="home-page-container">
            <div className="card home-content-box">
                <div className="home-text-section">
                    <h1>오늘 뭐 먹지?</h1>
                    <p className="home-subtitle">
                        서울시 맛집 탐정에게 땡기는 메뉴나 동네를 말해봐!
                    </p>
                    <form onSubmit={handleSubmit} className="home-form">
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