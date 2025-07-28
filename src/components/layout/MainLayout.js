import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'App.css';

function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      {/* Outlet이 HomePage.js 또는 ChatPage.js로 바뀝니다. */}
      <Outlet /> 
    </div>
  );
}

export default MainLayout;