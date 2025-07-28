import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export function useChat() {
  const location = useLocation();
  const { id: chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });
  const [copyStatus, setCopyStatus] = useState({});
  const initialMessageSent = useRef(false);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2000);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('답변이 복사되었습니다!');
      setCopyStatus(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [index]: false }));
      }, 2000);
    });
  };

  const handleFeedback = (index, type) => {
    const newFeedback = feedback[index] === type ? null : type;
    setFeedback(prev => ({ ...prev, [index]: newFeedback }));
    if (newFeedback) {
      showToast('피드백이 제출되었습니다.');
    }
  };

  const handleSend = async (textToSend) => {
    if (textToSend.trim() === '') return;

    const userMessage = { text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
        }),
      });

      if (!response.ok) {
        throw new Error('서버와 통신 중 오류가 발생했습니다.');
      }

      const aiResponse = await response.json();
      
      // ✨ 오류 해결: 서버 응답 키를 'reply'에서 'response'로 수정했습니다.
      setMessages(prev => [
        ...prev, 
        { text: aiResponse.response, sender: 'ai', streaming: true } 
      ]);

    } catch (error) {
      console.error("API 요청 오류:", error);
      setMessages(prev => [
        ...prev, 
        { text: '죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.', sender: 'ai', streaming: false }
      ]);
    }
  };
  
  const handleStreamComplete = (messageIndex) => {
    setMessages(prev =>
      prev.map((msg, index) =>
        index === messageIndex ? { ...msg, streaming: false } : msg
      )
    );
  };

  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage && !initialMessageSent.current) {
      initialMessageSent.current = true;
      handleSend(initialMessage);
    }
  }, [location.state?.initialMessage]);

  useEffect(() => {
    if (chatId) {
      setMessages([{ text: `${chatId}번 채팅방의 대화 기록입니다.`, sender: 'ai' }]);
    }
  }, [chatId]);

  return { messages, feedback, toast, copyStatus, handleSend, handleCopy, handleFeedback, handleStreamComplete };
}
