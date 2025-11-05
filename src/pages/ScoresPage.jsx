// src/pages/ScoresPage.jsx

function ScoresPage() {
  
  // 模拟的、硬编码的数据
  const mockScores = [
    { id: 1, username: 'SudokuMaster', completed: 42 },
    { id: 2, username: 'Player_123', completed: 35 },
    { id: 3, username: 'GridWizard', completed: 28 },
    { id: 4, username: 'ReactFan', completed: 15 },
  ];

  return (
    <div className="page-container scores-page">
      <h2>排行榜</h2>
      <p>此页面显示模拟数据，功能正在开发中。</p>
      
      <table className="scores-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>用户名</th>
            <th>完成数量</th>
          </tr>
        </thead>
        <tbody>
          {mockScores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoresPage;