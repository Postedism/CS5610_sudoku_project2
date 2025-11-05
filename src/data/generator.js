// src/data/generator.js

import SudokuGenerator from '../utils/SudokuGenerator';

// 设定不同难度的挖空数量 (Cells to KEEP)
const DIFFICULTY_LEVELS = {
    easy: { size: 6, cellsToKeep: 18 }, // 6x6 模式，保持一半单元格
    normal: { size: 9, cellsToKeep: 30 }, // 9x9 模式，保持大约 30 个单元格
};


/**
 * 根据模式生成一个新的数独谜题及其解。
 * @param {string} mode - 'easy' or 'normal'
 * @returns {{puzzle: number[][], solution: number[][]}}
 */
export const getPuzzle = (mode = 'normal') => {
    const level = DIFFICULTY_LEVELS[mode] || DIFFICULTY_LEVELS['normal'];
    
    // 实例化你的生成器
    const generator = new SudokuGenerator(level.size);
    
    // 生成并返回结果
    // 注意：你需要在你的生成器中处理将 'null' 转换为 '0'
    return generator.generate(level.cellsToKeep);
};