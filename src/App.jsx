import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { SudokuProvider } from './contexts/SudokuContext';

function App() {
  return (
    // SudokuProvider 包裹整个应用
    // 这样，应用内的任何组件都能访问游戏状态
    <SudokuProvider>
      <div className="app-container">
        <Navbar />
        <main>
          {/* Outlet 会根据 URL 渲染对应的子路由组件 */}
          <Outlet />
        </main>
      </div>
    </SudokuProvider>
  );
}

export default App;