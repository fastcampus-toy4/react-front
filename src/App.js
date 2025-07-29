import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';
// import SearchPage from './pages/Search/SearchPage';
// import RepositoryPage from './pages/Repository/RepositoryPage';
import LoginPage from './pages/Login/LoginPage';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} /> 
        {/* <Route path="/search" element={<SearchPage />} />
        <Route path="/repository" element={<RepositoryPage />} /> */}
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
