// src/components/Cell.jsx

import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';
import { isMoveInvalid } from '../utils/validation'; 

function Cell({ value, row, col, isInitial, isRightBorder, isBottomBorder }) {
  
  const state = useSudokuState();
  const dispatch = useSudokuDispatch();

  // *** 1. 获取 hintCell 和 selectedCell ***
  const isSelected = state.selectedCell?.row === row && state.selectedCell?.col === col;
  const isHint = state.hintCell?.row === row && state.hintCell?.col === col;
  
  const isIncorrect = isMoveInvalid(state.currentBoardState, row, col, value);

  const handleCellClick = () => {
    dispatch({
      type: 'SELECT_CELL',
      payload: { row, col },
    });
  };

  // *** 2. 更新 CSS 类名逻辑 ***
  let cellClass = 'sudoku-cell';
  if (isInitial) cellClass += ' cell-initial'; 
  
  // 提示的优先级最高
  if (isHint) {
    cellClass += ' cell-hinted';
  } else if (isSelected) {
    cellClass += ' cell-selected';
  }

  if (!isInitial && isIncorrect) {
    cellClass += ' cell-incorrect'; 
  }

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