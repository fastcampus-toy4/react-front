// **`src/pages/Chat/ChatPage.js`**

import React from 'react';
import ChatBot from './components/ChatBot';
import { useChat } from '../../hooks/useChat'; // 경로 수정

function ChatPage() {
  const {
    messages,
    isLoading, // 로딩 상태 추가
    error,     // 에러 상태 추가
    feedback,
    toast,
    copyStatus,
    handleSend,
    handleCopy,
    handleFeedback,
  } = useChat();

  return (
    <ChatBot
      messages={messages}
      onSend={handleSend}
      isLoading={isLoading} // 로딩 상태 전달
      error={error}         // 에러 상태 전달
      feedback={feedback}
      toast={toast}
      copyStatus={copyStatus}
      handleCopy={handleCopy}
      handleFeedback={handleFeedback}
    />
  );
}

export default ChatPage;
