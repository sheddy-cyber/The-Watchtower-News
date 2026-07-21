// frontend/src/pages/PuzzlesPage.jsx
import { useState } from "react";
import Icon from "../components/ui/Icon";
import { useToast } from "../context/ToastContext";

const DAILY_WORDS = [
  { word: "TOWER", hint: "The fortress of truth & journalism" },
  { word: "PRESS", hint: "The Fourth Estate of democracy" },
  { word: "TRUTH", hint: "The ultimate pursuit of a newsroom" },
];

export default function PuzzlesPage() {
  const showToast = useToast();
  const [activeTab, setActiveTab] = useState("wordle");
  
  // Daily Word state
  const [puzzleIndex] = useState(0);
  const targetWord = DAILY_WORDS[puzzleIndex].word;
  const targetHint = DAILY_WORDS[puzzleIndex].hint;
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'lost'

  const handleKeyPress = (char) => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length < 5) {
      setCurrentGuess((g) => g + char.toUpperCase());
    }
  };

  const handleDelete = () => {
    if (gameStatus !== "playing") return;
    setCurrentGuess((g) => g.slice(0, -1));
  };

  const handleSubmit = () => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length !== 5) {
      showToast("Word must be 5 letters long", "error");
      return;
    }

    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setCurrentGuess("");

    if (currentGuess === targetWord) {
      setGameStatus("won");
      showToast("Splendid! You solved today's Watchtower Word Puzzle!");
    } else if (nextGuesses.length >= 6) {
      setGameStatus("lost");
      showToast(`Game over! Today's word was ${targetWord}`);
    }
  };

  const getCharStyle = (char, index, guessWord) => {
    if (targetWord[index] === char) return { background: "var(--gold)", color: "#000", borderColor: "var(--gold)" };
    if (targetWord.includes(char)) return { background: "color-mix(in srgb, var(--color-accent-hover) 35%, transparent)", color: "var(--gold)", borderColor: "var(--gold-dim)" };
    return { background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", borderColor: "var(--border-subtle)" };
  };

  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="section-header" style={{ marginBottom: 28, textAlign: "center", display: "block" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Daily Edition · Issue #2026</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 5vw, 42px)", color: "var(--text-heading)", marginTop: 6 }}>
          The Watchtower Puzzles
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 8 }}>
          Sharpen your mind with our editorial wordle and newsroom puzzles.
        </p>
      </div>

      {/* Mode Switch */}
      <div className="auth-tabs" style={{ marginBottom: 32, justifyContent: "center" }}>
        <button
          className={`auth-tab${activeTab === "wordle" ? " active" : ""}`}
          onClick={() => setActiveTab("wordle")}
        >
          Daily Wordle
        </button>
        <button
          className={`auth-tab${activeTab === "crossword" ? " active" : ""}`}
          onClick={() => setActiveTab("crossword")}
        >
          Crossword Teaser
        </button>
      </div>

      {activeTab === "wordle" ? (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--gold-border)", padding: "28px 20px", borderRadius: "var(--radius)" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Clue: {targetHint}
            </span>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gap: 8, justifyContent: "center", marginBottom: 28 }}>
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : "");
              const isSubmitted = rowIndex < guesses.length;

              return (
                <div key={rowIndex} style={{ display: "flex", gap: 8 }}>
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    const char = guess[colIndex] || "";
                    const style = isSubmitted
                      ? getCharStyle(char, colIndex, guess)
                      : { background: "var(--bg-input)", color: "var(--text-heading)", borderColor: char ? "var(--gold)" : "var(--gold-border)" };

                    return (
                      <div
                        key={colIndex}
                        style={{
                          width: "clamp(36px, 11vw, 48px)",
                          height: "clamp(36px, 11vw, 48px)",
                          border: "1px solid",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(16px, 5vw, 22px)",
                          fontWeight: 700,
                          borderRadius: 4,
                          textTransform: "uppercase",
                          transition: "all 0.2s",
                          ...style,
                        }}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Status Message */}
          {gameStatus === "won" && (
            <div style={{ textAlign: "center", marginBottom: 24, padding: 14, background: "color-mix(in srgb, var(--color-accent) 12%, transparent)", border: "1px solid var(--color-accent)" }}>
              <strong style={{ color: "var(--color-accent)", fontSize: 16 }}>🎉 Victory! You solved today's puzzle!</strong>
            </div>
          )}

          {gameStatus === "lost" && (
            <div style={{ textAlign: "center", marginBottom: 24, padding: 14, background: "color-mix(in srgb, var(--color-error) 15%, transparent)", border: "1px solid var(--color-error)" }}>
              <strong style={{ color: "var(--color-error)", fontSize: 16 }}>Word was: {targetWord}</strong>
            </div>
          )}

          {/* Onscreen Keyboard */}
          <div style={{ display: "grid", gap: 6, maxWidth: 500, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} style={{ display: "flex", gap: "clamp(2px, 1vw, 6px)", justifyContent: "center", width: "100%" }}>
                {row.map((k) => (
                  <button
                    key={k}
                    className="btn btn-outline"
                    onClick={() => {
                      if (k === "ENTER") handleSubmit();
                      else if (k === "DEL") handleDelete();
                      else handleKeyPress(k);
                    }}
                    style={{
                      flex: k.length > 1 ? "1.5 1 0px" : "1 1 0px",
                      minWidth: 0,
                      padding: "10px 0",
                      fontSize: k.length > 1 ? "clamp(9px, 2.4vw, 11px)" : "clamp(11px, 3.2vw, 14px)",
                      fontWeight: 700,
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--gold-border)", padding: "40px 24px", textAlign: "center" }}>
          <Icon name="grid" size={48} style={{ color: "var(--gold)", opacity: 0.8, marginBottom: 16 }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-heading)", marginBottom: 8 }}>
            Watchtower Mini Crossword
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 420, margin: "0 auto 24px" }}>
            Full 15x15 Sunday Crosswords are delivered in our weekend edition newsletter.
          </p>
          <button className="btn btn-gold" onClick={() => setActiveTab("wordle")}>
            Play Daily Wordle <Icon name="arrowRight" size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
