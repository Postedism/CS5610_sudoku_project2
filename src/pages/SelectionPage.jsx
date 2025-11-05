// src/pages/SelectionPage.jsx
import { Link } from 'react-router-dom';

function SelectionPage() {
  
  // 模拟的、硬编码的数据
  const mockGames = [
    { id: 'sudoku', title: '经典数独', author: '本项目作者', path: '/games/normal' },
    // 你可以在这里添加更多模拟游戏
  ];

  return (
    <div className="page-container selection-page">
      <h2>选择一个游戏</h2>
      <p>此页面显示模拟数据，功能正在开发中。</p>
      
      <div className="game-list">
        {mockGames.map(game => (
          <div key={game.id} className="game-list-item">
            <h3>{game.title}</h3>
            <p>作者: {game.author}</p>
            <Link to={game.path} className="button-secondary">
              开始游戏
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectionPage;