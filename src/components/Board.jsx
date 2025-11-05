// src/components/Board.jsx

import Cell from './Cell';

function Board({ boardData, initialBoard }) {
  // 棋盘的大小 (6x6 或 9x9)
  const size = boardData.length;
  
  // *** 这是修正后的子宫格逻辑 ***
  // 9x9 棋盘: 3x3 子格
  // 6x6 棋盘: 2x3 子格 (2行高, 3列宽)
  const subgridHeight = size === 6 ? 2 : 3;
  const subgridWidth = 3; // 6x6 和 9x9 都是 3 列宽

  return (
    <div className={`sudoku-board size-${size}`}>
      {boardData.map((rowArr, rowIndex) => (
        // .board-row div 对于我们当前的 CSS 布局是必需的
        <div key={rowIndex} className="board-row">
          {rowArr.map((value, colIndex) => {
            
            const isInitial = initialBoard[rowIndex][colIndex] !== 0;
            
            // *** 这是修正后的边框计算 ***
            // 逻辑：在子宫格的 "末尾" 添加边框
            
            const isRightBorder = (colIndex + 1) % subgridWidth === 0 
                                  && (colIndex + 1) !== size;
                                  
            const isBottomBorder = (rowIndex + 1) % subgridHeight === 0 
                                   && (rowIndex + 1) !== size;
            
            return (
              <Cell
                key={colIndex}
                value={value}
                row={rowIndex}
                col={colIndex}
                isInitial={isInitial}
                isRightBorder={isRightBorder}
                isBottomBorder={isBottomBorder}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;