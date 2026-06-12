import React, { useMemo } from "react";
import { motion } from "framer-motion";
import "./heatmap.css";

export default function ProductivityHeatmap({ tasks }) {
  const heatmapData = useMemo(() => {
    const data = {};
    const days = 84; // 12 weeks

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      data[key] = 0;
    }

    tasks?.forEach(task => {
      const date = new Date(task.createdAt).toISOString().split("T")[0];
      if (data.hasOwnProperty(date)) {
        data[date]++;
      }
    });

    return Object.entries(data).reverse();
  }, [tasks]);

  const maxActivity = Math.max(...heatmapData.map(([, count]) => count), 1);

  const getColor = (count) => {
    if (count === 0) return "rgba(0, 0, 0, 0.1)";
    const intensity = count / maxActivity;
    const hue = intensity > 0.7 ? 120 : intensity > 0.4 ? 45 : 0;
    return `hsla(${hue}, 100%, 50%, ${intensity * 0.8})`;
  };

  return (
    <motion.div
      className="heatmap-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>🔥 Productivity Heatmap (Last 12 Weeks)</h3>
      <div className="heatmap-grid">
        {heatmapData.map(([date, count], idx) => (
          <motion.div
            key={date}
            className="heatmap-cell"
            style={{ background: getColor(count) }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            title={`${date}: ${count} tasks`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.01 }}
          />
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-gradient"></div>
        <span>More</span>
      </div>
    </motion.div>
  );
}
