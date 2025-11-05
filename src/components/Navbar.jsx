// src/components/Navbar.jsx

import { NavLink } from 'react-router-dom';

// 这是一个辅助函数，NavLink 会用它来动态设置 className
// 当链接处于 "active" 状态时 (即当前页面)，它会添加 'active-link' 类
const getNavLinkClass = ({ isActive }) => {
  return isActive ? 'nav-link active-link' : 'nav-link';
};

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* NavLink to="/" 需要 'end' 属性，以防止它匹配所有以 '/' 开头的路由 (比如 /rules) */}
        <NavLink to="/" className="navbar-logo" end>
          Sudoku
        </NavLink>
      </div>

      {/* 游戏和规则链接 */}
      <ul className="navbar-links">
        <li>
          <NavLink to="/games/easy" className={getNavLinkClass}>
            简单 (6x6)
          </NavLink>
        </li>
        <li>
          <NavLink to="/games/normal" className={getNavLinkClass}>
            普通 (9x9)
          </NavLink>
        </li>
        <li>
          <NavLink to="/rules" className={getNavLinkClass}>
            游戏规则
          </NavLink>
        </li>
      </ul>

      {/* 模拟的（Mocked）页面链接 */}
      <ul className="navbar-links-mocked">
        <li>
          <NavLink to="/scores" className={getNavLinkClass}>
            排行榜 (Mock)
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={getNavLinkClass}>
            登录 (Mock)
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={getNavLinkClass}>
            注册 (Mock)
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;