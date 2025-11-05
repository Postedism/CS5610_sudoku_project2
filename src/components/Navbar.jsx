// src/components/Navbar.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// 辅助函数 (保持不变)
const getNavLinkClass = ({ isActive }) => {
  return isActive ? 'nav-link active-link' : 'nav-link';
};

function Navbar() {
  // *** 新增：State 来管理汉堡菜单的开关状态 ***
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    // *** 修改：根据 isNavOpen 动态添加 "nav-open" 类 ***
    <nav className={isNavOpen ? 'navbar nav-open' : 'navbar'}>
      <div className="navbar-brand">
        <NavLink 
          to="/" 
          className="navbar-logo" 
          end
          onClick={() => setIsNavOpen(false)} // 点击 Logo 关闭菜单
        >
          Sudoku
        </NavLink>
      </div>

      {/* *** 新增：汉堡菜单按钮 (只在移动端 CSS 中显示) *** */}
      <button 
        className="nav-toggle" 
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation"
      >
        <span className="hamburger-icon"></span>
      </button>

      {/* *** 新增：.nav-menu-wrapper 
        *** 这个 div 帮助我们在移动端正确布局链接
      */}
      <div className="nav-menu-wrapper">
        <ul className="navbar-links">
          <li>
            <NavLink to="/games/easy" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              简单 (6x6)
            </NavLink>
          </li>
          <li>
            <NavLink to="/games/normal" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              普通 (9x9)
            </NavLink>
          </li>
          <li>
            <NavLink to="/rules" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              游戏规则
            </NavLink>
          </li>
        </ul>

        {/* 模拟的链接 */}
        <ul className="navbar-links-mocked">
          <li>
            <NavLink to="/scores" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              排行榜 (Mock)
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              登录 (Mock)
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              注册 (Mock)
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;