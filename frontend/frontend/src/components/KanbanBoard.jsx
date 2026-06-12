import React, { useMemo } from "react";
import { motion } from "framer-motion";
import "./kanban.css";

export default function KanbanBoard({ tasks, onTaskStatusChange }) {
  const columns = {
    "Pending": [],
    "In Progress": [],
    "Completed": []
  };

  tasks?.forEach(task => {
    if (columns[task.status]) {
      columns[task.status].push(task);
    }
  });

  const getPriorityColor = (priority) => {
    const colors = { "Low": "#10b981", "Medium": "#f59e0b", "High": "#ef4444" };
    return colors[priority] || "#667eea";
  };

  const handleDragStart = (e, task, fromStatus) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("task", JSON.stringify({ task, fromStatus }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, toStatus) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));
    if (data.fromStatus !== toStatus) {
      onTaskStatusChange?.(data.task._id, toStatus);
    }
  };

  return (
    <motion.div
      className="kanban-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>📊 Kanban Board</h3>
      <div className="kanban-board">
        {Object.entries(columns).map(([status, tasks]) => (
          <motion.div
            key={status}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="column-header">
              <h4>{status}</h4>
              <span className="task-count">{tasks.length}</span>
            </div>
            <div className="column-tasks">
              {tasks.map((task, idx) => (
                <motion.div
                  key={task._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, status)}
                  className="kanban-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
                >
                  <div className="card-header">
                    <span className="type-badge">{task.type?.slice(0, 3).toUpperCase()}</span>
                    <span className="priority-dot" style={{ background: getPriorityColor(task.priority) }}></span>
                  </div>
                  <h5>{task.title}</h5>
                  <p>{task.description?.slice(0, 50)}...</p>
                  <div className="card-footer">
                    <small>{new Date(task.dueDate).toLocaleDateString()}</small>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
