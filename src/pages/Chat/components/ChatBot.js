import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import ChatInput from './ChatInput'; 
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
      <ChatInput onSend={onSend} />
      
       {toast.show && <div className="feedback-toast">{toast.message}</div>}
    </div>
  );
}

export default ChatBot;
