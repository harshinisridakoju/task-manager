import React, { useState } from "react";
import { motion } from "framer-motion";
import "./calendar.css";

export default function Calendar({ events, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events?.filter(e => new Date(e.startDate).toDateString() === date.toDateString()) || [];
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <motion.div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""}`}
          whileHover={{ scale: 1.05 }}
          onClick={() => onDateSelect?.(date)}
        >
          <div className="day-number">{day}</div>
          <div className="day-events">
            {dayEvents.slice(0, 2).map((e, i) => (
              <div key={i} className="event-dot" style={{ background: e.color || "#667eea" }}></div>
            ))}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <motion.div
      className="calendar-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="calendar-header">
        <h3>📅 Calendar</h3>
        <div className="view-modes">
          {["month", "week", "day"].map(mode => (
            <button
              key={mode}
              className={`view-btn ${viewMode === mode ? "active" : ""}`}
              onClick={() => setViewMode(mode)}
            >
              {mode.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="calendar-nav">
        <button onClick={handlePrevMonth}>◀ Prev</button>
        <h4>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
        <button onClick={handleNextMonth}>Next ▶</button>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {renderCalendar()}
      </div>
    </motion.div>
  );
}
