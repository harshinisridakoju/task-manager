import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskForm from "../components/taskform";
import TaskCard from "../components/taskcard";
import Calendar from "../components/Calendar";
import Analytics from "../components/Analytics";
import KanbanBoard from "../components/KanbanBoard";
import ProductivityHeatmap from "../components/ProductivityHeatmap";
import PomodoroTimer from "../components/PomodoroTimer";
import Achievements from "../components/Achievements";
import QuickActionsFAB from "../components/QuickActionsFAB";
import AIAssistant from "../components/AIAssistant";
import { taskService } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("list");
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Failed to load tasks. Make sure the backend server is running on port 5000.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    const task = tasks.find(t => t._id === taskId);
    if (task) {
      await taskService.updateTask(taskId, { ...task, status: newStatus });
      handleTaskUpdated({ ...task, status: newStatus });
    }
  };

  const handleQuickAction = (action) => {
    if (action === "new-task") setShowTaskForm(true);
    else if (action === "analytics") setView("analytics");
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
  };

  return (
    <div className="container">
      <motion.div
        className="dashboard-container"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="dashboard">
          <motion.div
            className="dashboard-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>📋 Task Dashboard</h1>
            <div className="view-switcher">
              {["list", "kanban", "calendar", "analytics"].map(v => (
                <motion.button
                  key={v}
                  className={`view-btn ${view === v ? "active" : ""}`}
                  onClick={() => setView(v)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {v === "list" && "📋 List"}
                  {v === "kanban" && "📊 Kanban"}
                  {v === "calendar" && "📅 Calendar"}
                  {v === "analytics" && "📈 Analytics"}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="stats-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="stat-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </motion.div>
            <motion.div
              className="stat-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </motion.div>
            <motion.div
              className="stat-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-number">{stats.inProgress}</div>
              <div className="stat-label">In Progress</div>
            </motion.div>
            <motion.div
              className="stat-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="error-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              className="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </motion.div>
          )}

          {/* Task Form Toggle */}
          {!loading && (
            <AnimatePresence>
              {showTaskForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TaskForm onTaskAdded={handleTaskAdded} />
                  <button
                    className="close-form-btn"
                    onClick={() => setShowTaskForm(false)}
                  >
                    ✕ Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Main Content Area */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* List View */}
              {view === "list" && (
                <div>
                  <motion.div
                    className="filter-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      className="create-task-btn"
                      onClick={() => setShowTaskForm(!showTaskForm)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ➕ New Task
                    </motion.button>
                    {["All", "Pending", "In Progress", "Completed"].map((status) => (
                      <motion.button
                        key={status}
                        className={`filter-btn ${filter === status ? "active" : ""}`}
                        onClick={() => setFilter(status)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {status}
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div
                    className="tasks-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          onTaskUpdated={handleTaskUpdated}
                          onTaskDeleted={handleTaskDeleted}
                        />
                      ))
                    ) : (
                      <motion.div
                        className="no-tasks"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p>
                          {filter === "All"
                            ? "No tasks yet. Create one to get started! 🚀"
                            : `No ${filter.toLowerCase()} tasks. 🎉`}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>

                  <div className="dashboard-grid">
                    <PomodoroTimer />
                    <ProductivityHeatmap tasks={tasks} />
                  </div>

                  <Achievements tasks={tasks} />
                </div>
              )}

              {/* Kanban View */}
              {view === "kanban" && (
                <KanbanBoard tasks={tasks} onTaskStatusChange={handleTaskStatusChange} />
              )}

              {/* Calendar View */}
              {view === "calendar" && (
                <Calendar events={tasks} onDateSelect={(date) => console.log(date)} />
              )}

              {/* Analytics View */}
              {view === "analytics" && (
                <Analytics tasks={tasks} />
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions FAB */}
      <QuickActionsFAB onAction={handleQuickAction} />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}

export default Dashboard;