// **`src/pages/Chat/components/ChatBot.js`**

import React, { useRef, useEffect } from 'react';
import './ChatBot.css';
import ChatInput from './ChatInput';
import RestaurantCard from './RestaurantCard'; // 맛집 카드 컴포넌트 임포트
import likeIcon from '../../../assets/images/like.png';
import likeFilledIcon from '../../../assets/images/like-filled.png';
import dislikeIcon from '../../../assets/images/dislike.png';
import dislikeFilledIcon from '../../../assets/images/dislike-filled.png';
import copyIcon from '../../../assets/images/copy.png';
import copyFilledIcon from '../../../assets/images/copy-filled.png';

function ChatBot({ messages, onSend, isLoading, error, feedback, toast, copyStatus, handleCopy, handleFeedback }) {
  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="message-area" ref={messageAreaRef}>
        {messages.filter(Boolean).map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.sender}`}>
            <div className={`message ${msg.sender}`}>
              {msg.text}
            </div>

            {/* ▼▼▼ 추천 맛집(recommendations) 렌더링 부분 추가 ▼▼▼ */}
            {msg.recommendations && (
              <div className="recommendations-grid">
                {msg.recommendations.map((resto, rIndex) => (
                  <RestaurantCard key={rIndex} data={resto} />
                ))}
              </div>
            )}
            {/* ▲▲▲ 추천 맛집 렌더링 부분 끝 ▲▲▲ */}

            {msg.sender === 'ai' && (
              <div className="feedback-actions">
                <button onClick={() => handleFeedback(index, 'like')} className="feedback-button">
                  <img src={feedback[index] === 'like' ? likeFilledIcon : likeIcon} alt="좋아요" className="feedback-icon-img" />
                </button>
                <button onClick={() => handleFeedback(index, 'dislike')} className="feedback-button">
                  <img src={feedback[index] === 'dislike' ? dislikeFilledIcon : dislikeIcon} alt="싫어요" className="feedback-icon-img" />
                </button>
                <button onClick={() => handleCopy(msg.text, index)} className="feedback-button">
                  <img src={copyStatus[index] ? copyFilledIcon : copyIcon} alt="복사" className="feedback-icon-img" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* 로딩 중일 때 로딩 인디케이터 표시 */}
        {isLoading && (
          <div className="message-wrapper ai">
            <div className="message ai">
              <span className="loading-indicator">...</span>
            </div>
          </div>
        )}

        {/* 에러 발생 시 에러 메시지 표시 */}
        {error && (
            <div className="message-wrapper ai">
                <div className="message error">
                    오류가 발생했습니다: {error}
                </div>
            </div>
        )}
      </div>

      <ChatInput onSend={onSend} disabled={isLoading} /> {/* 입력창 비활성화 */}

      {toast.show && <div className="feedback-toast">{toast.message}</div>}
    </div>
  );
}

export default ChatBot;