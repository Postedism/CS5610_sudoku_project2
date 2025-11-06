# Sudoku React (CS 5610 Project2)

A dynamic Sudoku game built with React, Context API, and a backtracking algorithm for puzzle generation.

### Links
* **Live URL (Deployed on Render):** https://cs5610-sudoku-project2.onrender.com
* **GitHub Repository:** https://github.com/Postedism/CS5610_sudoku_project2

---

## Features

This project fulfills all core assignment requirements and bonus assignment

### Core Requirements (Completed)
* **Mock Pages:** Includes a `Login` page (with password obscuring), a `Register` page, and a `High Score` page with mock data.
* **Rules Page:** A dedicated, clean-routed `/rules` page explaining the game, including a "Credits" section.
* **Navbar:** A fully responsive,sticky navigation bar that highlights the active link and collapses into a "hamburger" menu on mobile.
* **Mobile Design:** The entire application, including the game board, is fully responsive and tested for usability on an iPhone 12 Pro (and similar) viewport.

### Bonus Features

* **1. Dynamic Puzzle Generation:** Instead of using static, hard-coded puzzles, this app features a custom **`SudokuGenerator.js` utility**. This class uses a **backtracking algorithm(same as MA)** combined with a **Fisher-Yates shuffle** to generate a unique, solvable 9x9 or 6x6 puzzle *every time* the user starts a new game.

* **2. Hint System:** A "Hint" button  implements a  Single solving algorithm, which scans the board for the *first* empty cell that has only one possible valid number, providing a logical next step.

* **3. Local Storage Persistence:** The game state (current board and timer) is automatically saved to the user's `localStorage`. Users can refresh the page, close their browser, and **resume their game** exactly where they left off. The timer also resumes, and this state is automatically cleared upon winning.

* **4. Real-Time Validation:** The board provides instant visual feedback. Any user-entered number that conflicts with the game's rules is immediately highlighted with the `.cell-incorrect` (red) style.

* **5. Full Keyboard Navigation:** The game is fully controllable via the keyboard, including:
	* **Arrow Keys** for selection.
	* **Number Keys (1-9)** for input.
	* **Backspace/Delete** to clear a cell.

* **6. Game Timer:** A `useEffect` hook manages a `setInterval` to track the user's game time, which stops immediately upon solving the puzzle.

---

## Tech Stack & Architecture

* **Frontend:** React (Vite)
* **State Management:** **React Context API** & **useReducer Hook**
	* All complex game logic (input, validation, hints, timer) is centralized in `SudokuContext.jsx`. This avoids "prop drilling" and makes state transitions predictable and easy to debug.
* **Routing:** `react-router-dom`
* **Deployment:** Render (for Static Sites)