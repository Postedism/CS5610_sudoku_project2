// src/pages/RulesPage.jsx

function RulesPage() {
  return (
    <div className="page-container rules-page">
      <h2>游戏规则</h2>
      <p>数独的目标很简单：将数字填满整个网格。</p>
      
      <section className="rules-section">
        <h3>基本规则</h3>
        <p>你必须遵循以下三个约束条件：</p>
        <ul>
          <li>
            <strong>1. 行 (Row):</strong> 每一行必须包含 1-9 (或 1-6) 之间的所有数字，且不能重复。
          </li>
          <li>
            <strong>2. 列 (Column):</strong> 每一列必须包含 1-9 (或 1-6) 之间的所有数字，且不能重复。
          </li>
          <li>
            <strong>3. 宫 (Subgrid):</strong> 每一个子网格 (用粗线标记的 3x3 或 2x3 区域) 必须包含 1-9 (或 1-6) 之间的所有数字，且不能重复。
          </li>
        </ul>
        <p>
          本游戏中的初始给定数字 (灰色单元格) 是不可更改的。当所有空白单元格都被正确填充后，游戏即告胜利。
        </p>
      </section>

      <section className="credits-section">
        <h3>Credits (制作人员)</h3>
        <p>本项目由 [请在这里填写你的名字] 完成。</p>
        <div className="credit-links">
          {/* 根据项目要求，你可以使用假链接，或替换成你自己的真实链接。
            target="_blank" rel="noopener noreferrer" 确保链接在新标签页中安全打开。
          */}
          <a 
            href="https://github.com/[你的Github用户名]" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/[你的LinkedIn用户名]" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com">
            Email
          </a>
        </div>
      </section>
    </div>
  );
}

export default RulesPage;