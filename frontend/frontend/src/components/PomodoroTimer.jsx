import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./pomodoro.css";

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      setIsWorkSession(!isWorkSession);
      setTime(isWorkSession ? 5 * 60 : 25 * 60);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, isWorkSession]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setTime(isWorkSession ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = ((isWorkSession ? 25 * 60 - time : 5 * 60 - time) / (isWorkSession ? 25 * 60 : 5 * 60)) * 100;

  return (
    <motion.div
      className="pomodoro-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>⏱️ Pomodoro Focus Timer</h3>
      
      <div className="pomodoro-content">
        <motion.div
          className="timer-circle"
          style={{
            background: isWorkSession
              ? "conic-gradient(#667eea 0deg, #667eea " + (progress * 3.6) + "deg, var(--accent-bg) " + (progress * 3.6) + "deg)"
              : "conic-gradient(#10b981 0deg, #10b981 " + (progress * 3.6) + "deg, var(--accent-bg) " + (progress * 3.6) + "deg)"
          }}
        >
          <div className="timer-display">
            <div className="session-type">{isWorkSession ? "Work" : "Break"}</div>
            <div className="time">{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</div>
          </div>
        </motion.div>

        <div className="timer-controls">
          <motion.button
            className="timer-btn primary"
            onClick={toggleTimer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRunning ? "⏸ Pause" : "▶ Start"}
          </motion.button>
          <motion.button
            className="timer-btn secondary"
            onClick={resetTimer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Reset
          </motion.button>
        </div>

        <div className="timer-stats">
          <div className="stat">
            <span className="stat-label">Work</span>
            <span className="stat-value">25 min</span>
          </div>
          <div className="stat">
            <span className="stat-label">Break</span>
            <span className="stat-value">5 min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
