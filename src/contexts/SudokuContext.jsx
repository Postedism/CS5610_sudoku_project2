// src/contexts/SudokuContext.jsx

import React, { createContext, useContext, useReducer, useEffect } from 'react';
// 1. 导入我们动态的生成器
import { getPuzzle } from '../data/generator'; 
// 2. 导入我们的提示算法
import { findNakedSingle } from '../utils/validation'; 

// 辅助函数：检查胜利
function checkWin(board, solution) {
  if (!board.length || !solution.length) return false;
  return JSON.stringify(board) === JSON.stringify(solution);
}

// 3. 包含所有功能的初始状态
const initialState = {
  gameMode: 'normal',
  initialBoard: [],
  solutionBoard: [],
  currentBoardState: [],
  selectedCell: null,
  hintCell: null, // 提示状态
  timer: 0,
  isWon: false,
};

// 4. Local Storage 初始化函数
const initializer = (defaultState) => {
  try {
    const storedState = localStorage.getItem('sudokuGameState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState && !parsedState.isWon) {
        console.log("从 Local Storage 加载了游戏状态。");
        return { ...defaultState, ...parsedState }; 
      }
    }
  } catch (error) {
    console.error("无法从 Local Storage 加载状态:", error);
    localStorage.removeItem('sudokuGameState');
  }
  return defaultState;
};

// 5. 完整的 Reducer (包含所有修复)
function sudokuReducer(state, action) {
  switch (action.type) {
    case 'START_NEW_GAME': {
      const { puzzle, solution } = getPuzzle(action.payload.mode);
      return {
        ...initialState,
        gameMode: action.payload.mode,
        initialBoard: puzzle,
        solutionBoard: solution,
        currentBoardState: puzzle,
      };
    }
    
    case 'RESET_GAME': {
      return {
        ...state,
        currentBoardState: state.initialBoard,
        selectedCell: null,
        hintCell: null,
        timer: 0,
        isWon: false,
      };
    }

    // (我们修复的 Bug 就在这里)
    case 'SELECT_CELL': {
      return {
        ...state,
        selectedCell: action.payload,
        hintCell: null,
      };
    }

    case 'UPDATE_CELL_VALUE': {
      if (state.isWon) return state;
      const { row, col, value } = action.payload;
      const size = state.gameMode === 'easy' ? 6 : 9;

      // 阻止写入初始单元格
      if (state.initialBoard[row][col] !== 0) return state;
      if (value < 0 || value > size) return state;
      
      const newBoardState = state.currentBoardState.map(row => [...row]);
      newBoardState[row][col] = value;
      
      const isWon = checkWin(newBoardState, state.solutionBoard);
      
      return {
        ...state,
        currentBoardState: newBoardState,
        isWon: isWon,
        hintCell: null,
      };
    }
    
    // 提示系统
    case 'FIND_HINT': {
      if (state.isWon) return state;
      const hint = findNakedSingle(state.currentBoardState);
      if (hint) {
        return {
          ...state,
          selectedCell: { row: hint.row, col: hint.col },
          hintCell: { row: hint.row, col: hint.col },
        };
      } else {
        return state;
      }
    }
    
    // 计时器
    case 'TICK_TIMER': {
      if (state.isWon) return state;
      return { ...state, timer: state.timer + 1 };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}


// 6. Context 定义 (之前我们遗漏过的)
const SudokuStateContext = createContext(undefined);
const SudokuDispatchContext = createContext(undefined);


// 7. Provider (这是修复构建错误的关键)
// *** 确保这里的 'export' 关键字存在！***
export function SudokuProvider({ children }) {
  const [state, dispatch] = useReducer(sudokuReducer, initialState, initializer);

  // 8. Local Storage 存储 Effect
  useEffect(() => {
    try {
      if (state.isWon) {
        console.log("游戏胜利！清除 Local Storage。");
        localStorage.removeItem('sudokuGameState');
      } else if (state.initialBoard.length > 0) {
        const stateToSave = JSON.stringify(state);
        localStorage.setItem('sudokuGameState', stateToSave);
      }
    } catch (error) {
      console.error("无法保存状态到 Local Storage:", error);
    }
  }, [state]);

  // 返回 Provider
  return (
    <SudokuStateContext.Provider value={state}>
      <SudokuDispatchContext.Provider value={dispatch}>
        {children}
      </SudokuDispatchContext.Provider>
    </SudokuStateContext.Provider>
  );
}

// 9. 自定义 Hooks
export function useSudokuState() {
  const context = useContext(SudokuStateContext);
  if (context === undefined) {
    throw new Error('useSudokuState must be used within a SudokuProvider');
  }
  return context;
}

export function useSudokuDispatch() {
  const context = useContext(SudokuDispatchContext);
  if (context === undefined) {
    throw new Error('useSudokuDispatch must be used within a SudokuProvider');
  }
  return context;
}