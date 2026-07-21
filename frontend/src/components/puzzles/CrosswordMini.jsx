// frontend/src/components/puzzles/CrosswordMini.jsx
import { useState, useEffect, useRef } from "react";
import Icon from "../ui/Icon";
import { useToast } from "../../context/ToastContext";
import styles from "./CrosswordMini.module.css";

const GRID_SIZE = 5;

// Using a classic symmetric word square
const SOLUTION = [
  "HEART",
  "EMBER",
  "ABUSE",
  "RESIN",
  "TREND",
];

const CLUES_ACROSS = [
  { num: 1, row: 0, col: 0, text: "Organ that pumps blood" },
  { num: 6, row: 1, col: 0, text: "Glowing piece of coal" },
  { num: 7, row: 2, col: 0, text: "Mistreatment" },
  { num: 8, row: 3, col: 0, text: "Sticky pine tree secretion" },
  { num: 9, row: 4, col: 0, text: "Current fashion or craze" },
];

const CLUES_DOWN = [
  { num: 1, row: 0, col: 0, text: "Organ that pumps blood" },
  { num: 2, row: 0, col: 1, text: "Glowing piece of coal" },
  { num: 3, row: 0, col: 2, text: "Mistreatment" },
  { num: 4, row: 0, col: 3, text: "Sticky pine tree secretion" },
  { num: 5, row: 0, col: 4, text: "Current fashion or craze" },
];

export default function CrosswordMini() {
  const showToast = useToast();
  // State: grid is 5x5 array of strings (user's input)
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill("").map(() => Array(GRID_SIZE).fill("")));
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 0 });
  const [direction, setDirection] = useState("across"); // "across" or "down"
  const [gameWon, setGameWon] = useState(false);

  const containerRef = useRef(null);

  // Focus trap for keyboard events
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const getActiveWordCells = () => {
    const cells = [];
    if (direction === "across") {
      for (let c = 0; c < GRID_SIZE; c++) cells.push({ r: selectedCell.r, c });
    } else {
      for (let r = 0; r < GRID_SIZE; r++) cells.push({ r, c: selectedCell.c });
    }
    return cells;
  };

  const isCellActive = (r, c) => {
    return selectedCell.r === r && selectedCell.c === c;
  };

  const isCellInActiveWord = (r, c) => {
    if (direction === "across") return selectedCell.r === r;
    return selectedCell.c === c;
  };

  const handleCellClick = (r, c) => {
    if (gameWon) return;
    if (selectedCell.r === r && selectedCell.c === c) {
      setDirection(d => d === "across" ? "down" : "across");
    } else {
      setSelectedCell({ r, c });
    }
  };

  const advanceCursor = (forward = true) => {
    if (direction === "across") {
      if (forward && selectedCell.c < GRID_SIZE - 1) setSelectedCell(s => ({ ...s, c: s.c + 1 }));
      else if (!forward && selectedCell.c > 0) setSelectedCell(s => ({ ...s, c: s.c - 1 }));
    } else {
      if (forward && selectedCell.r < GRID_SIZE - 1) setSelectedCell(s => ({ ...s, r: s.r + 1 }));
      else if (!forward && selectedCell.r > 0) setSelectedCell(s => ({ ...s, r: s.r - 1 }));
    }
  };

  const checkWin = (newGrid) => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] !== SOLUTION[r][c]) return false;
      }
    }
    return true;
  };

  const handleKeyDown = (e) => {
    if (gameWon) return;
    // Prevent default scrolling for arrows/space
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === "ArrowUp") {
      if (selectedCell.r > 0) setSelectedCell(s => ({ ...s, r: s.r - 1 }));
    } else if (e.key === "ArrowDown") {
      if (selectedCell.r < GRID_SIZE - 1) setSelectedCell(s => ({ ...s, r: s.r + 1 }));
    } else if (e.key === "ArrowLeft") {
      if (selectedCell.c > 0) setSelectedCell(s => ({ ...s, c: s.c - 1 }));
    } else if (e.key === "ArrowRight") {
      if (selectedCell.c < GRID_SIZE - 1) setSelectedCell(s => ({ ...s, c: s.c + 1 }));
    } else if (e.key === "Backspace") {
      const newGrid = [...grid];
      newGrid[selectedCell.r] = [...newGrid[selectedCell.r]];
      
      if (newGrid[selectedCell.r][selectedCell.c] === "") {
        // If already empty, step back and delete
        advanceCursor(false);
      } else {
        // Delete current cell
        newGrid[selectedCell.r][selectedCell.c] = "";
        setGrid(newGrid);
      }
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      const char = e.key.toUpperCase();
      const newGrid = [...grid];
      newGrid[selectedCell.r] = [...newGrid[selectedCell.r]];
      newGrid[selectedCell.r][selectedCell.c] = char;
      setGrid(newGrid);
      
      if (checkWin(newGrid)) {
        setGameWon(true);
        showToast("Brilliant! You solved the Mini Crossword!");
      } else {
        advanceCursor(true);
      }
    }
  };

  const getCellNumber = (r, c) => {
    const across = CLUES_ACROSS.find(clue => clue.row === r && clue.col === c);
    const down = CLUES_DOWN.find(clue => clue.row === r && clue.col === c);
    if (across) return across.num;
    if (down) return down.num;
    return null;
  };

  const activeAcrossClue = CLUES_ACROSS.find(c => c.row === selectedCell.r)?.text;
  const activeDownClue = CLUES_DOWN.find(c => c.col === selectedCell.c)?.text;
  const currentClue = direction === "across" ? activeAcrossClue : activeDownClue;

  return (
    <div className={styles.container}>
      {gameWon && (
        <div className={styles.victoryBanner}>
          <Icon name="star" size={16} />
          <strong>Puzzle Solved!</strong>
        </div>
      )}

      {/* Grid Area */}
      <div 
        className={styles.gridWrapper} 
        onKeyDown={handleKeyDown} 
        tabIndex={0} 
        ref={containerRef}
      >
        <div className={styles.grid}>
          {grid.map((row, r) => (
            row.map((cell, c) => {
              const num = getCellNumber(r, c);
              const isActive = isCellActive(r, c);
              const isWord = isCellInActiveWord(r, c);
              
              let cellClass = styles.cell;
              if (isActive) cellClass += ` ${styles.activeCell}`;
              else if (isWord) cellClass += ` ${styles.wordCell}`;

              return (
                <div 
                  key={`${r}-${c}`} 
                  className={cellClass}
                  onClick={() => handleCellClick(r, c)}
                >
                  {num && <span className={styles.cellNum}>{num}</span>}
                  <span className={styles.cellText}>{cell}</span>
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Clues Area */}
      <div className={styles.clueBar}>
        <span className={styles.clueDir}>{direction.toUpperCase()}</span>
        <span className={styles.clueText}>{currentClue}</span>
      </div>

      <div className={styles.cluesLists}>
        <div className={styles.cluesCol}>
          <h4 className={styles.cluesHeader}>Across</h4>
          <ul className={styles.clueList}>
            {CLUES_ACROSS.map(clue => (
              <li 
                key={`a-${clue.num}`} 
                className={direction === "across" && selectedCell.r === clue.row ? styles.activeClueItem : ""}
                onClick={() => { setDirection("across"); setSelectedCell({ r: clue.row, c: clue.col }); containerRef.current?.focus(); }}
              >
                <strong>{clue.num}</strong> {clue.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.cluesCol}>
          <h4 className={styles.cluesHeader}>Down</h4>
          <ul className={styles.clueList}>
            {CLUES_DOWN.map(clue => (
              <li 
                key={`d-${clue.num}`}
                className={direction === "down" && selectedCell.c === clue.col ? styles.activeClueItem : ""}
                onClick={() => { setDirection("down"); setSelectedCell({ r: clue.row, c: clue.col }); containerRef.current?.focus(); }}
              >
                <strong>{clue.num}</strong> {clue.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
