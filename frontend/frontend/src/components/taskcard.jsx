import { useState } from "react";
import { motion } from "framer-motion";
import { taskService } from "../services/taskService";
import "./taskcard.css";

const getTypeIcon = (type) => {
  const icons = {
    Work: "💼",
    Personal: "👤",
    Shopping: "🛒",
    Health: "❤️",
    Education: "📚",
    Other: "📌",
  };
  return icons[type] || "📌";
};

const getPriorityColor = (priority) => {
  const colors = {
    Low: "#10b981",
    Medium: "#f59e0b",
    High: "#ef4444",
  };
  return colors[priority] || "#6b7280";
};

export default function TaskCard({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const updated = await taskService.updateTask(task._id, {
        ...task,
        status: newStatus,
      });
      onTaskUpdated(updated);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setLoading(true);
      try {
        await taskService.deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const updated = await taskService.updateTask(task._id, editData);
      onTaskUpdated(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No due date";

  return (
    <motion.div
      className="task-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {!isEditing ? (
        <>
          <div className="task-header">
            <div className="task-title-section">
              <span className="task-type-icon">{getTypeIcon(task.type)}</span>
              <div>
                <h3 className={`task-title ${task.status === "Completed" ? "completed" : ""}`}>
                  {task.title}
                </h3>
                {task.description && <p className="task-description">{task.description}</p>}
              </div>
            </div>
            <div
              className="task-priority"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </div>
          </div>

          <div className="task-meta">
            <span className="task-date">📅 {formattedDate}</span>
            <span className="task-type">{task.type}</span>
          </div>

          <div className="task-status">
            <label>Status:</label>
            <div className="status-buttons">
              {["Pending", "In Progress", "Completed"].map((status) => (
                <motion.button
                  key={status}
                  className={`status-btn ${task.status === status ? "active" : ""}`}
                  onClick={() => handleStatusChange(status)}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="task-actions">
            <motion.button
              className="btn-edit"
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✏️ Edit
            </motion.button>
            <motion.button
              className="btn-delete"
              onClick={handleDelete}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🗑️ Delete
            </motion.button>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Task description"
            rows="3"
          />
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSaveEdit} disabled={loading}>
              💾 Save
            </button>
            <button
              className="btn-cancel"
              onClick={() => setIsEditing(false)}
              disabled={loading}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
