// src/components/Timer.jsx

import { useSudokuState } from '../contexts/SudokuContext';

// 辅助函数：将总秒数格式化为 MM:SS
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // padStart(2, '0') 确保数字始终是两位数 (例如 "1" -> "01")
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}


function Timer() {
  // 从全局状态中读取当前的 timer 值
  const { timer } = useSudokuState();

  return (
    <div className="timer-container">
      <h3>时间</h3>
      <div className="timer-display">
        {formatTime(timer)}
      </div>
    </div>
  );
}

export default Timer;