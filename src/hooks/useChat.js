// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useLocation, useParams, useNavigate } from 'react-router-dom';
//
// const API_BASE_URL = 'http://localhost:9000';
//
// export function useChat() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { id: chatIdFromUrl } = useParams();
//
//   const [chatState, setChatState] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const initialMessageSent = useRef(false);
//
//   // --- 기타 UI 상태 ---
//   const [feedback, setFeedback] = useState({});
//   const [toast, setToast] = useState({ show: false, message: '' });
//   const [copyStatus, setCopyStatus] = useState({});
//
//   // 1. useCallback으로 함수를 감싸서 안정화
//   const handleSend = useCallback(async (userInput, stateToUse) => {
//     // 2. 조건문에서 currentState를 사용하도록 수정
//     const currentState = stateToUse || chatState;
//     if (!userInput.trim() || !currentState || isLoading) return;
//
//     setIsLoading(true);
//     setError(null);
//     setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
//
//     try {
//       const response = await fetch(`${API_BASE_URL}/chat/message`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           state: currentState,
//           user_input: userInput,
//         }),
//       });
//
//       if (!response.ok) throw new Error('메시지 전송에 실패했습니다.');
//
//       const data = await response.json();
//       setChatState(data.state);
//
//       const botMessage = {
//         sender: 'ai',
//         text: data.bot_response,
//         recommendations: data.recommendations || null,
//       };
//       setMessages(prev => [...prev, botMessage]);
//
//     } catch (err) {
//       setError(err.message);
//       setMessages(prev => [
//         ...prev,
//         { sender: 'ai', text: '죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.' },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [chatState, isLoading]); // handleSend가 의존하는 값들을 배열에 명시
//
//   useEffect(() => {
//     // location.state에서 HomePage가 보내준 initialState를 가져옵니다.
//     const { initialState } = location.state || {};
//
//     if (chatIdFromUrl) {
//       // HomePage로부터 initialState를 성공적으로 받았다면,
//       if (initialState) {
//         // 1. 받은 state로 전체 채팅 상태를 설정합니다.
//         setChatState(initialState);
//
//         // 2. 백엔드가 보내준 'conversation_history' 전체를 화면에 표시할 메시지 형식으로 변환합니다.
//         const formattedMessages = initialState.conversation_history.map(msg => {
//           if (msg.startsWith('User: ')) {
//             return { sender: 'user', text: msg.replace('User: ', '') };
//           }
//           if (msg.startsWith('Bot: ')) {
//             return { sender: 'ai', text: msg.replace('Bot: ', '') };
//           }
//           // 혹시 모를 다른 타입의 메시지를 위해 추가
//           return { sender: 'system', text: msg };
//         });
//
//         // 3. 변환된 메시지 목록을 화면에 설정합니다.
//         setMessages(formattedMessages);
//       }
//       // initialState 없이 URL로만 들어왔다면 (예: 새로고침)
//       else {
//         // TODO: 백엔드에서 채팅 기록 불러오는 API 호출
//         console.log(`${chatIdFromUrl}번 채팅 기록을 불러옵니다.`);
//         setMessages([{ sender: 'ai', text: `${chatIdFromUrl}번 채팅방의 대화 기록입니다.` }]);
//       }
//     } else {
//       // /chat 경로로 잘못 들어오면 홈으로 보냅니다.
//       navigate('/');
//     }
//     // 의존성 배열에서 handleSend를 제거합니다. 더 이상 필요 없습니다.
//   }, [chatIdFromUrl, location.state, navigate]);
//
//
//
//   // --- UI 관련 함수들 ---
//   const showToast = (message) => {
//     setToast({ show: true, message });
//     setTimeout(() => setToast({ show: false, message: '' }), 2000);
//   };
//
//   const handleCopy = (text, index) => {
//     navigator.clipboard.writeText(text).then(() => {
//       showToast('답변이 복사되었습니다!');
//       setCopyStatus(prev => ({ ...prev, [index]: true }));
//       setTimeout(() => setCopyStatus(prev => ({ ...prev, [index]: false })), 2000);
//     });
//   };
//
//   const handleFeedback = (index, type) => {
//     const newFeedback = feedback[index] === type ? null : type;
//     setFeedback(prev => ({ ...prev, [index]: newFeedback }));
//     if (newFeedback) showToast('피드백이 제출되었습니다.');
//   };
//
//   return {
//     messages,
//     isLoading,
//     error,
//     feedback,
//     toast,
//     copyStatus,
//     handleSend,
//     handleCopy,
//     handleFeedback,
//   };
// }


import { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

// [중요] 사용하시는 API 서버 주소로 설정하세요.
const API_BASE_URL = 'http://localhost:9000';

export function useChat() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: chatIdFromUrl } = useParams();

  const [chatState, setChatState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- UI 관련 상태 ---
  const [feedback, setFeedback] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });
  const [copyStatus, setCopyStatus] = useState({});

  // useCallback으로 함수를 감싸서 항상 최신 상태를 참조하도록 합니다.
  const handleSend = useCallback(async (userInput) => {
    if (!userInput.trim() || !chatState || isLoading) return;

    setIsLoading(true);
    setError(null);
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: chatState, // 최신 chatState를 사용
          user_input: userInput,
        }),
      });

      if (!response.ok) throw new Error('메시지 전송에 실패했습니다.');

      const data = await response.json();
      setChatState(data.state); // 백엔드로부터 받은 새로운 state로 교체

      const botMessage = {
        sender: 'ai',
        text: data.response, // 'bot_response'가 아닌 'response'를 사용
        recommendations: data.recommendations || null,
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      setError(err.message);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: '죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [chatState, isLoading]); // handleSend가 의존하는 값들을 배열에 명시

  useEffect(() => {
    const { initialState } = location.state || {};

    if (chatIdFromUrl) {
      if (initialState) {
        setChatState(initialState);
        // 백엔드가 보내준 대화 기록 전체를 화면에 표시할 형식으로 변환
        const formattedMessages = initialState.conversation_history.map(msg => {
          if (msg.startsWith('User: ')) return { sender: 'user', text: msg.replace('User: ', '') };
          if (msg.startsWith('Bot: ')) return { sender: 'ai', text: msg.replace('Bot: ', '') };
          return { sender: 'system', text: msg };
        });
        setMessages(formattedMessages);
      }
      else {
        // TODO: 새로고침 시 히스토리 불러오는 API 연동
        console.log(`${chatIdFromUrl}번 채팅 기록을 불러옵니다.`);
        setMessages([{ sender: 'ai', text: `${chatIdFromUrl}번 채팅방의 대화 기록입니다.` }]);
      }
    } else {
      navigate('/');
    }
  }, [chatIdFromUrl, location.state, navigate]);

  // --- UI 관련 함수들 ---
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('답변이 복사되었습니다!');
      setCopyStatus(prev => ({ ...prev, [index]: true }));
      setTimeout(() => setCopyStatus(prev => ({ ...prev, [index]: false })), 2000);
    });
  };
  const handleFeedback = (index, type) => {
    const newFeedback = feedback[index] === type ? null : type;
    setFeedback(prev => ({ ...prev, [index]: newFeedback }));
    if (newFeedback) showToast('피드백이 제출되었습니다.');
  };

  return {
    messages,
    isLoading,
    error,
    feedback,
    toast,
    copyStatus,
    handleSend,
    handleCopy,
    handleFeedback,
  };
}