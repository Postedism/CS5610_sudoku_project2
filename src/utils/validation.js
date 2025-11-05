// src/utils/validation.js

/**
 * 检查一个值在当前棋盘的特定位置是否无效（即时检查）。
 * @param {number[][]} board - 当前的棋盘状态 (currentBoardState)
 * @param {number} row - 要检查的行
 * @param {number} col - 要检查的列
 * @param {number} value - 要检查的值
 * @returns {boolean} - 如果该值无效（即有冲突），则返回 true
 */
export function isMoveInvalid(board, row, col, value) {
  // 规则 1: 值必须在 1-size 之间 (0 是空的，总是有效的)
  if (value === 0) {
    return false;
  }
  
  const size = board.length;

  // 规则 2: 检查行 (Row)
  // 遍历该行，如果发现相同的值（且不在我们当前的位置），则无效
  for (let c = 0; c < size; c++) {
    if (c !== col && board[row][c] === value) {
      return true; // 冲突
    }
  }

  // 规则 3: 检查列 (Column)
  // 遍历该列，如果发现相同的值（且不在我们当前的位置），则无效
  for (let r = 0; r < size; r++) {
    if (r !== row && board[r][col] === value) {
      return true; // 冲突
    }
  }

  // 规则 4: 检查子宫格 (Subgrid)
  const subgridHeight = size === 6 ? 2 : 3;
  const subgridWidth = 3; // 6x6 (2x3) 和 9x9 (3x3) 都是 3 列宽

  // 找到该子宫格的起始行和起始列
  const startRow = Math.floor(row / subgridHeight) * subgridHeight;
  const startCol = Math.floor(col / subgridWidth) * subgridWidth;

  for (let r = startRow; r < startRow + subgridHeight; r++) {
    for (let c = startCol; c < startCol + subgridWidth; c++) {
      // 检查子宫格内的每个单元格
      if ((r !== row || c !== col) && board[r][c] === value) {
        return true; // 冲突
      }
    }
  }

  // 如果所有检查都通过
  return false;
}

/**
 * 查找“唯一候选数”(Naked Single)
 * 遍历棋盘，找到第一个只有一个可能有效数字的空格子。
 * @param {number[][]} board - 当前的棋盘状态
 * @returns {object | null} - 返回 { row, col, value } 或 null
 */
export function findNakedSingle(board) {
  const size = board.length;

  // 遍历所有单元格
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      
      // 1. 只检查空格子
      if (board[r][c] === 0) {
        
        // 2. 找到所有可能的候选数
        const candidates = [];
        for (let val = 1; val <= size; val++) {
          // 使用我们已有的验证函数来检查这个值是否（暂时）有效
          if (!isMoveInvalid(board, r, c, val)) {
            candidates.push(val);
          }
        }

        // 3. 检查是否为“唯一候选数”
        if (candidates.length === 1) {
          // 找到了！这就是我们的提示
          return {
            row: r,
            col: c,
            value: candidates[0], // 那个唯一的值
          };
        }
      }
    }
  }

  // 遍历完整个棋盘都没有找到
  return null;
}