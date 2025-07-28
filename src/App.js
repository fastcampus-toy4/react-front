import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';

const SearchPage = () => <h1 style={{padding: '50px'}}>🔍 채팅 검색 페이지</h1>;
const LibraryPage = () => <h1 style={{padding: '50px'}}>📚 라이브러리 페이지</h1>;
const LoginPage = () => <h1 style={{padding: '50px'}}>🔑 로그인 페이지</h1>;


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* 나중에 실제 채팅 기록을 보여줄 경로. :id는 변할 수 있다는 의미 */}
        <Route path="/chat/:id" element={<ChatPage />} /> 
        
        {/* 새로 추가된 페이지 경로들 */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;