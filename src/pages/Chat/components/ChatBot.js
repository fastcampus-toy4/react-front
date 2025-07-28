import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChatBot.css';
import TextareaAutosize from 'react-textarea-autosize';
import logoImage from 'assets/images/logo.png';
import likeIcon from 'assets/images/like.png';
import likeFilledIcon from 'assets/images/like-filled.png';
import dislikeIcon from 'assets/images/dislike.png';
import dislikeFilledIcon from 'assets/images/dislike-filled.png';
import copyIcon from 'assets/images/copy.png';
import copyFilledIcon from 'assets/images/copy-filled.png';

function StreamedMessage({ fullText, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex >= fullText.length) {
        clearInterval(intervalId);
        onComplete();
        return;
      }
      setDisplayedText(fullText.substring(0, currentIndex + 1));
      currentIndex++;
    }, 30);
    return () => clearInterval(intervalId);
  }, [fullText, onComplete]);
  return <>{displayedText}</>;
}

function ChatBot({ messages, onSend, feedback, toast, copyStatus, handleCopy, handleFeedback, handleStreamComplete }) {
  const [input, setInput] = useState('');
  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="chatbot-container">
      <header className="chat-header">
        <Link to="/" className="logo">
          <img src={logoImage} alt="점메추봇 로고" />
        </Link>
      </header>
      <div className="message-area" ref={messageAreaRef}>
        {messages.filter(Boolean).map((msg, index) => (
           <div key={index} className={`message-wrapper ${msg.sender}`}>
            <div className={`message ${msg.sender}`}>
              {msg.sender === 'ai' && msg.streaming ? (
                <StreamedMessage 
                  fullText={msg.text} 
                  onComplete={() => handleStreamComplete(index)} 
                />
              ) : (
                msg.text
              )}
            </div>
            {msg.sender === 'ai' && !msg.streaming && (
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
      </div>
      <div className="input-area-wrapper">
        <div className="input-area">
          <TextareaAutosize
            minRows={1} maxRows={5}
            placeholder="메시지를 입력하세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            className={input.trim() !== '' ? 'active' : ''}
          >
            ↑
          </button>
        </div>
      </div>
       <p className="disclaimer">
         점메추봇은 실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.
       </p>
       {toast.show && <div className="feedback-toast">{toast.message}</div>}
    </div>
  );
}

export default ChatBot;