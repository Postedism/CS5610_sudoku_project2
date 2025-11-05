// src/utils/SudokuGenerator.js

/**
 * Fisher-Yates Algorithm
 * @param {Array} array - Original Array 
 * @returns {Array} - shuffled Array
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// *** 导出 shuffle 供 SudokuGenerator 使用 ***
export { shuffle }; 


class SudokuGenerator {
    /**
     * @param {number} size chessboard size, 9 means 9x9 and 6 means 6x6
     */
    constructor(size) {
        this.size = size;
        this.board = Array(size).fill(0).map(() => Array(size).fill(null));

        if (size === 9) {
            this.subgridRows = 3;
            this.subgridCols = 3;
            this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        } else if (size === 6) {
            this.subgridRows = 2; 
            this.subgridCols = 3; 
            this.numbers = [1, 2, 3, 4, 5, 6];
        } else {
            throw new Error("Wrong Size");
        }
    }

    // ... (findEmptyCell, isSafe 保持不变) ...
    findEmptyCell() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.board[r][c] === null) {
                    return [r, c];
                }
            }
        }
        return null; 
    }

    isSafe(row, col, num) {
        // 1. check row
        for (let c = 0; c < this.size; c++) {
            if (this.board[row][c] === num) {
                return false;
            }
        }

        // 2. check col
        for (let r = 0; r < this.size; r++) {
            if (this.board[r][col] === num) {
                return false;
            }
        }

        // 3. check subgrid
        const startRow = row - (row % this.subgridRows);
        const startCol = col - (col % this.subgridCols);

        for (let r = 0; r < this.subgridRows; r++) {
            for (let c = 0; c < this.subgridCols; c++) {
                if (this.board[startRow + r][startCol + c] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // ... (fillBoard 保持不变) ...
    fillBoard() {
        const emptyCell = this.findEmptyCell();
        if (!emptyCell) {
            return true;
        }
        const [row, col] = emptyCell;
        const randomNumbers = shuffle([...this.numbers]);

        for (const num of randomNumbers) {
            if (this.isSafe(row, col, num)) {
                this.board[row][col] = num;
                if (this.fillBoard()) {
                    return true; 
                }
                this.board[row][col] = null;
            }
        }
        return false;
    }

    // ... (removeCells 保持不变) ...
    removeCells(cellsToKeep) {
        let cellsToRemove = (this.size * this.size) - cellsToKeep;
        while (cellsToRemove > 0) {
            const row = Math.floor(Math.random() * this.size);
            const col = Math.floor(Math.random() * this.size);
            if (this.board[row][col] !== null) {
                this.board[row][col] = null;
                cellsToRemove--;
            }
        }
    }

    // ... (printBoard 保持不变, 但我们将删除它，因为它只用于控制台) ...
    // ... (我们不需要在应用中使用 printBoard) ...


    /**
     * generate function
     * @param {number} cellsToKeep
     * @returns {{puzzle: number[][], solution: number[][]}}
     */
    generate(cellsToKeep) {
        // 重置棋盘
        this.board = Array(this.size).fill(0).map(() => Array(this.size).fill(null));

        // 1. 填充完整棋盘 (Solution)
        if (!this.fillBoard()) {
            // 如果第一次失败，尝试第二次 (虽然极少发生，但可以增加健壮性)
            if (!this.fillBoard()) {
                console.error("Sudoku Generation Failed!");
                throw new Error("Failed to generate a complete board.");
            }
        }
        
        // 复制完整的棋盘作为 Solution
        const solution = this.board.map(row => [...row]);

        // 2. 挖空 (Puzzle)
        this.removeCells(cellsToKeep);
        
        // 3. 复制挖空后的棋盘作为 Puzzle
        // *** 关键：将 null 转换回 0，以匹配我们 Context 中使用的逻辑 ***
        const puzzle = this.board.map(row => 
            row.map(cell => (cell === null ? 0 : cell))
        );
        
        // 返回结果
        return {
            puzzle: puzzle,
            solution: solution, // solution 保持为 1-9
        };
    }
}

// *** 导出类 ***
export default SudokuGenerator;