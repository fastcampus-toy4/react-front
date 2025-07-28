import React from 'react';
import ChatBot from './components/ChatBot';
import { useChat } from 'hooks/useChat';

function ChatPage() {
  const { 
    messages, 
    feedback, 
    toast, 
    copyStatus, 
    handleSend, 
    handleCopy, 
    handleFeedback,
    handleStreamComplete
  } = useChat();

  return (
    <ChatBot
      messages={messages}
      onSend={handleSend}
      feedback={feedback}
      toast={toast}
      copyStatus={copyStatus}
      handleCopy={handleCopy}
      handleFeedback={handleFeedback}
      handleStreamComplete={handleStreamComplete}
    />
  );
}

export default ChatPage;