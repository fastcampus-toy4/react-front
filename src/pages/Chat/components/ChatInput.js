import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

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
    <>
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
    </>
  );
}

export default ChatInput;