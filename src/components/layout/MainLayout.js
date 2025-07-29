import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import 'App.css';

function MainLayout() { //Header, footer, sidebar ...
  // 사이드바 토글 로직
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className="content-wrapper">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;