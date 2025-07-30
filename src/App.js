import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';
import RepositoryPage from './pages/Repository/RepositoryPage';
import HistoryTimeline from './pages/History/HistoryTimeline';
import LoginPage from './pages/Login/LoginPage';
import FindIdPage from './pages/FindId/FindIdPage';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} /> 
        <Route path="/repository" element={<RepositoryPage />} />
        <Route path="/history" element={<HistoryTimeline />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-id" element={<FindIdPage />} />
    </Routes>
  );
}

export default App;
