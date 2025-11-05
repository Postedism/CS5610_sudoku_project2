// src/contexts/SudokuContext.jsx

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getPuzzle } from '../data/generator';
import { findNakedSingle } from '../utils/validation'; 

// 辅助函数：检查胜利
function checkWin(board, solution) {
  if (!board.length || !solution.length) return false;
  return JSON.stringify(board) === JSON.stringify(solution);
}

// 1. 定义初始状态
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

// 2. Reducer 初始化函数 (用于 Local Storage)
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

// 3. Reducer 函数
// src/contexts/SudokuContext.jsx

// ... (在 SudokuContext.jsx 文件的顶部，
// ... 保持你的 imports, checkWin, initialState, 和 initializer 不变) ...


// --- 从这里开始替换 ---

// 3. Reducer 函数 (已修正)
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

    // *** 这是你 Bug 所在的地方 ***
    // *** 这个版本是 100% 正确的 ***
    case 'SELECT_CELL': {
      return {
        ...state, // 确保你保留了其他状态
        selectedCell: action.payload, // 将 {row, col} 存入 state
        hintCell: null, // 清除提示高亮
      };
    }

    case 'UPDATE_CELL_VALUE': {
      if (state.isWon) return state;
      
      const { row, col, value } = action.payload;
      const size = state.gameMode === 'easy' ? 6 : 9;

      // 检查是否为初始单元格
      if (state.initialBoard[row][col] !== 0) {
        return state;
      }
      
      // 检查值是否在 0-size 范围内
      if (value < 0 || value > size) {
        return state;
      }

      const newBoardState = state.currentBoardState.map(row => [...row]);
      newBoardState[row][col] = value;

      const isWon = checkWin(newBoardState, state.solutionBoard);

      return {
        ...state,
        currentBoardState: newBoardState,
        isWon: isWon,
        hintCell: null, // 输入时清除提示
      };
    }
    
    case 'FIND_HINT': {
      if (state.isWon) return state;
      
      const hint = findNakedSingle(state.currentBoardState);
      
      if (hint) {
        return {
          ...state,
          selectedCell: { row: hint.row, col: hint.col }, // 这一行曾“掩盖”了 Bug
          hintCell: { row: hint.row, col: hint.col },
        };
      } else {
        return state;
      }
    }
    
    case 'TICK_TIMER': {
      if (state.isWon) {
        return state;
      }
      return {
        ...state,
        timer: state.timer + 1,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- 在这里结束替换 ---

// ... (保持你的 SudokuProvider 和自定义 Hooks 不变) ...


// *** 4. 修正：添加缺失的 Context 定义 ***
// 这些行在我之前的代码段中被遗漏了，导致了你的错误
const SudokuStateContext = createContext(undefined);
const SudokuDispatchContext = createContext(undefined);


// 5. Provider 组件
export function SudokuProvider({ children }) {
  const [state, dispatch] = useReducer(sudokuReducer, initialState, initializer);

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

  // 这一行 (第 121 行附近) 现在可以找到 SudokuStateContext 了
  return (
    <SudokuStateContext.Provider value={state}>
      <SudokuDispatchContext.Provider value={dispatch}>
        {children}
      </SudokuDispatchContext.Provider>
    </SudokuStateContext.Provider>
  );
}

// 6. 自定义 Hooks
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