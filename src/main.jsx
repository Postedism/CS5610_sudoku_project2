// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'; // 导入全局样式
import App from './App'; // 导入主布局组件
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import GamePage from './pages/GamePage';
// ... 导入你的其他模拟页面 (Scores, Login, etc.)
import ScoresPage from './pages/ScoresPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SelectionPage from './pages/SelectionPage';


// 定义你网站的所有路由
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App 组件作为包含 Navbar 的布局
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/rules', element: <RulesPage /> },
      
      // *** 使用动态路由参数 :mode (正确) ***
      { path: '/games', element: <SelectionPage /> },
      { path: '/games/:mode', element: <GamePage /> }, 
      { path: '/scores', element: <ScoresPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
]);

// 渲染应用 (正确的方式)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 使用 RouterProvider 渲染路由系统 */}
    <RouterProvider router={router} />
  </React.StrictMode>
);