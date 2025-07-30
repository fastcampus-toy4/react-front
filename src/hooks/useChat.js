// **`src/hooks/useChat.js`**

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// 백엔드 API의 기본 URL
const API_BASE_URL = 'http://155.248.175.96:9000/';

export function useChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: chatIdFromUrl } = useParams(); // URL의 채팅 ID

  // --- 상태 관리 ---
  // 챗봇과의 전체 대화 상태를 관리 (가장 중요)
  const [chatState, setChatState] = useState(null);
  // 메시지 목록 (화면 표시용)
  const [messages, setMessages] = useState([]);
  // API 호출 중인지 여부
  const [isLoading, setIsLoading] = useState(false);
  // 에러 메시지
  const [error, setError] = useState(null);

  // --- 기타 UI 상태 ---
  const [feedback, setFeedback] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });
  const [copyStatus, setCopyStatus] = useState({});
  const initialMessageSent = useRef(false);

  // --- 대화 시작 함수 ---
  const startChat = useCallback(async (initialData = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initialData), // user_id 등을 포함할 수 있음
      });

      if (!response.ok) throw new Error('대화 시작에 실패했습니다.');

      const data = await response.json();
      setChatState(data.state); // 백엔드로부터 받은 state 저장
      setMessages([{ sender: 'ai', text: data.bot_response }]);
    } catch (err) {
      setError(err.message);
      setMessages([{ sender: 'ai', text: '죄송합니다. 서버에 연결할 수 없습니다.' }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- 메시지 전송 함수 ---
  const handleSend = async (userInput) => {
    if (!userInput.trim() || !chatState || isLoading) return;

    setIsLoading(true);
    setError(null);

    // 사용자 메시지를 화면에 즉시 추가
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: chatState, // 현재 대화 state를 그대로 전송
          user_input: userInput,
        }),
      });

      if (!response.ok) throw new Error('메시지 전송에 실패했습니다.');

      const data = await response.json();
      setChatState(data.state); // 백엔드로부터 받은 새로운 state로 교체

      // 봇 응답 메시지 추가 (추천 결과가 있으면 함께 추가)
      const botMessage = {
        sender: 'ai',
        text: data.bot_response,
        recommendations: data.recommendations || null,
      };
      setMessages(prev => [...prev, botMessage]);

      // 대화가 종료되면 URL 변경
      if (data.is_final) {
        navigate(`/chat/${data.state.session_id}`, { replace: true });
      }

    } catch (err) {
      setError(err.message);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: '죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 컴포넌트 마운트 시 실행 로직 ---
  useEffect(() => {
    // URL에 chatId가 있으면, 해당 기록을 불러옴
    if (chatIdFromUrl) {
      // TODO: 백엔드에서 특정 session_id의 기록을 불러오는 API 구현 후 연동
      console.log(`${chatIdFromUrl}번 채팅 기록을 불러옵니다.`);
      // 예시: setMessages([{ sender: 'ai', text: `${chatIdFromUrl} 대화 기록` }]);
    }
    // URL에 chatId가 없고, 새로운 대화를 시작해야 할 때
    else if (!chatState) {
        const initialMessage = location.state?.initialMessage;
        // user_id는 로그인 구현 후 실제 ID로 변경 필요
        startChat({ user_id: 'test_user_01' }).then(() => {
            if (initialMessage && !initialMessageSent.current) {
                initialMessageSent.current = true;
                handleSend(initialMessage);
            }
        });
    }
  }, [chatIdFromUrl, location.state, chatState, startChat, handleSend, navigate]);


  // --- 피드백/복사 등 UI 관련 함수들 ---
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