import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';
import RepositoryPage from './pages/Repository/RepositoryPage';
import HistoryTimeline from './pages/History/HistoryTimeline';
import LoginPage from './pages/Login/LoginPage';
import FindIdPage from './pages/FindId/FindIdPage';
import FindPwPage from './pages/FindPw/FindPwPage';
import SignupPage from './pages/Signup/SignupPage';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:id" element={<ChatPage />} /> 
        <Route path="/repository" element={<RepositoryPage />} />
        <Route path="/history" element={<HistoryTimeline />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-id" element={<FindIdPage />} />
      <Route path="/find-pw" element={<FindPwPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
