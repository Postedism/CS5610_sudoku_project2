// src/pages/GamePage.jsx

import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';
import Board from '../components/Board';
import Timer from '../components/Timer'; 
// import NumberPad from '../components/NumberPad'; 

function GamePage() {
  const { mode } = useParams();
  const gameMode = mode === 'easy' ? 'easy' : 'normal';

  const state = useSudokuState();
  const dispatch = useSudokuDispatch();
  const { selectedCell, gameMode: stateGameMode, initialBoard, isWon } = state;

  // === 启动新游戏 (无改动) ===
  useEffect(() => {
    if (state.currentBoardState.length === 0 || stateGameMode !== gameMode) {
      dispatch({
        type: 'START_NEW_GAME',
        payload: { mode: gameMode },
      });
    }
  }, [gameMode, state.currentBoardState.length, stateGameMode, dispatch]);

  
  // === 键盘事件处理 (无改动) ===
  const handleKeyDown = useCallback((event) => {
    if (isWon || !selectedCell) {
      return;
    }
    const { key } = event;
    const { row, col } = selectedCell;
    const size = gameMode === 'easy' ? 6 : 9;
    const numericValue = parseInt(key);
    if (numericValue >= 1 && numericValue <= size) {
      event.preventDefault();
      dispatch({
        type: 'UPDATE_CELL_VALUE',
        payload: { row, col, value: numericValue },
      });
      return;
    }
    if (key === 'Backspace' || key === 'Delete' || key === '0') {
      event.preventDefault();
      dispatch({
        type: 'UPDATE_CELL_VALUE',
        payload: { row, col, value: 0 },
      });
      return;
    }
    let newRow = row;
    let newCol = col;
    if (key === 'ArrowUp') {
      event.preventDefault();
      newRow = Math.max(0, row - 1);
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      newRow = Math.min(size - 1, row + 1);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      newCol = Math.max(0, col - 1);
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      newCol = Math.min(size - 1, row + 1);
    }
    if (newRow !== row || newCol !== col) {
      dispatch({
        type: 'SELECT_CELL',
        payload: { row: newRow, col: newCol },
      });
    }
  }, [dispatch, selectedCell, gameMode, isWon]);

  
  // === 注册和清理键盘事件 (无改动) ===
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  // === 启动和管理计时器 (无改动) ===
  useEffect(() => {
    let intervalId = null;
    if (!isWon) {
      intervalId = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isWon, dispatch]); 


  // === 渲染 (修正后) ===
  if (state.currentBoardState.length === 0) {
    return <div>正在加载 {gameMode} 数独谜题...</div>;
  }

  return (
    <div className="game-page"> {/* <-- 根元素开始 */}
      
      <div className="game-header">
        <h2>数独 - {gameMode.toUpperCase()} 模式</h2>
        <Timer />
      </div>
      
      <div className="game-container">
        <div className="board-area">
          <Board 
            boardData={state.currentBoardState} 
            initialBoard={state.initialBoard} 
          />
        </div>
        
        <div className="controls-area">
          <h3>控制区</h3>
          <p>选中单元格后，可在此输入数字。</p>
          <p>当前计时器: {state.timer} 秒</p>
          
          {/* *** 修正 1：添加 .button-group div *** */}
          <div className="button-group">
            <button 
              onClick={() => dispatch({ type: 'RESET_GAME' })}
              disabled={isWon}
            >
              重置游戏
            </button>
            <button 
              onClick={() => dispatch({ type: 'START_NEW_GAME', payload: { mode: gameMode } })}
            >
              新游戏
            </button>

            <button 
              className="button-hint"
              onClick={() => dispatch({ type: 'FIND_HINT' })}
              disabled={isWon}
            >
              提示 {/* *** 修正 2：添加按钮文本 *** */}
            </button>
          </div> {/* <-- .button-group 关闭 */}
        </div> {/* <-- .controls-area 关闭 */}
      </div> {/* <-- .game-container 关闭 */}
      
      {/* * *** 修正 3：删除了这里多余的 </div> ***
      */}
      
      {/* 恭喜消息现在正确地位于 .game-page 内部 */}
      {state.isWon && (
        <div className="congratulations-message">
          🎉 恭喜！你成功完成了数独！ 🎉
        </div>
      )}

    </div> /* <-- 根元素 .game-page 在这里正确关闭 */
  );
}

export default GamePage;