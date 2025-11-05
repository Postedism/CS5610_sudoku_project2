// src/components/Cell.jsx

import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';
import { isMoveInvalid } from '../utils/validation'; 

function Cell({ value, row, col, isInitial, isRightBorder, isBottomBorder }) {
  
  const state = useSudokuState();
  const dispatch = useSudokuDispatch();

  // 获取所有状态
  const isSelected = state.selectedCell?.row === row && state.selectedCell?.col === col;
  const isHint = state.hintCell?.row === row && state.hintCell?.col === col;
  const isIncorrect = isMoveInvalid(state.currentBoardState, row, col, value);

  // 点击处理 (保持不变)
  const handleCellClick = () => {
    dispatch({
      type: 'SELECT_CELL',
      payload: { row, col },
    });
  };

  // *** 修正：更新 CSS 类名逻辑以设置优先级 ***
  let cellClass = 'sudoku-cell';
  if (isInitial) cellClass += ' cell-initial'; 
  
  // --- 新的优先级逻辑 ---
  
  // 优先级 1: 如果是不正确的，总是显示红色
  if (!isInitial && isIncorrect) {
    cellClass += ' cell-incorrect';
  
  // 优先级 2: 如果不是不正确的，并且是提示，显示绿色
  } else if (isHint) {
    cellClass += ' cell-hinted';
  
  // 优先级 3: 如果既不错误也不被提示，只是被选中，显示蓝色
  } else if (isSelected) {
    cellClass += ' cell-selected';
  }
  // --- 逻辑结束 ---

  // 边框逻辑 (保持不变)
  if (isRightBorder) cellClass += ' border-right-heavy';
  if (isBottomBorder) cellClass += ' border-bottom-heavy';

  return (
    <div 
      className={cellClass} 
      onClick={handleCellClick}
      data-row={row}
      data-col={col}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}

export default Cell;