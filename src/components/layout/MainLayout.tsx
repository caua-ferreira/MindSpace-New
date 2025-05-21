import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-24 px-8 pb-8 min-h-[calc(100vh-4rem)] transition-colors duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;