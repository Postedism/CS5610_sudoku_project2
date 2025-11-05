// src/pages/HomePage.jsx

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-container home-page">
      <header className="home-header">
        <h1>Sudoku React</h1>
        <p>一个使用 React 和 Context API 构建的经典逻辑益智游戏。</p>
      </header>
      
      <section className="home-actions">
        <Link to="/games/normal" className="home-button button-primary">
          开始游戏 (9x9)
        </Link>
        <Link to="/games/easy" className="home-button button-secondary">
          简单模式 (6x6)
        </Link>
        <Link to="/rules" className="home-button button-secondary">
          查看规则
        </Link>
      </section>
    </div>
  );
}

export default HomePage;