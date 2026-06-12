import React, { useMemo } from "react";
import { motion } from "framer-motion";
import "./achievements.css";

export default function Achievements({ tasks }) {
  const achievements = useMemo(() => {
    const unlocked = [];
    const total = tasks?.length || 0;
    const completed = tasks?.filter(t => t.status === "Completed").length || 0;

    if (completed > 0) unlocked.push({ title: "First Step", desc: "Complete 1 task", icon: "🎯", id: 1 });
    if (completed >= 5) unlocked.push({ title: "On Fire", desc: "Complete 5 tasks", icon: "🔥", id: 2 });
    if (completed >= 10) unlocked.push({ title: "Unstoppable", desc: "Complete 10 tasks", icon: "⚡", id: 3 });
    if (completed >= 25) unlocked.push({ title: "Legend", desc: "Complete 25 tasks", icon: "👑", id: 4 });
    if (total >= 20) unlocked.push({ title: "Taskmaster", desc: "Create 20 tasks", icon: "📋", id: 5 });
    if (tasks?.some(t => t.priority === "High" && t.status === "Completed")) {
      unlocked.push({ title: "High Priority Hero", desc: "Complete a high priority task", icon: "🦸", id: 6 });
    }

    const allAchievements = [
      { title: "First Step", desc: "Complete 1 task", icon: "🎯", id: 1 },
      { title: "On Fire", desc: "Complete 5 tasks", icon: "🔥", id: 2 },
      { title: "Unstoppable", desc: "Complete 10 tasks", icon: "⚡", id: 3 },
      { title: "Legend", desc: "Complete 25 tasks", icon: "👑", id: 4 },
      { title: "Taskmaster", desc: "Create 20 tasks", icon: "📋", id: 5 },
      { title: "High Priority Hero", desc: "Complete a high priority task", icon: "🦸", id: 6 },
    ];

    return {
      unlocked,
      locked: allAchievements.filter(a => !unlocked.find(u => u.id === a.id)),
      progress: Math.round((unlocked.length / allAchievements.length) * 100)
    };
  }, [tasks]);

  return (
    <motion.div
      className="achievements-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="achievements-header">
        <h3>🏆 Achievements</h3>
        <div className="progress-ring">
          <div className="progress-value">{achievements.progress}%</div>
        </div>
      </div>

      <div className="achievements-grid">
        {achievements.unlocked.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            className="achievement-card unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <h4>{achievement.title}</h4>
            <p>{achievement.desc}</p>
            <span className="unlocked-badge">✓ Unlocked</span>
          </motion.div>
        ))}

        {achievements.locked.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            className="achievement-card locked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (achievements.unlocked.length + idx) * 0.1 }}
          >
            <div className="achievement-icon locked-icon">🔒</div>
            <h4>???</h4>
            <p>Locked</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
