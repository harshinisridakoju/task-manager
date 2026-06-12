import { useState } from "react";
import { motion } from "framer-motion";
import { taskService } from "../services/taskService";
import "./taskform.css";

export default function TaskForm({ onTaskAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Other",
    priority: "Medium",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.title.trim()) {
        setError("Title is required");
        setLoading(false);
        return;
      }

      const newTask = await taskService.createTask(formData);
      setFormData({
        title: "",
        description: "",
        type: "Other",
        priority: "Medium",
        dueDate: "",
      });

      if (onTaskAdded) {
        onTaskAdded(newTask);
      }
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="task-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>➕ Add New Task</h2>

      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <motion.input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <motion.textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="4"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <motion.select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              whileFocus={{ scale: 1.02 }}
            >
              <option value="Work">💼 Work</option>
              <option value="Personal">👤 Personal</option>
              <option value="Shopping">🛒 Shopping</option>
              <option value="Health">❤️ Health</option>
              <option value="Education">📚 Education</option>
              <option value="Other">📌 Other</option>
            </motion.select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <motion.select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              whileFocus={{ scale: 1.02 }}
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </motion.select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <motion.input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? "Adding Task..." : "Add Task"}
        </motion.button>
      </form>
    </motion.div>
  );
}
