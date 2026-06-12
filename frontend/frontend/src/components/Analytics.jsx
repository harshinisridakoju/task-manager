import React, { useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import "./analytics.css";

export default function Analytics({ tasks }) {
  const analytics = useMemo(() => {
    const data = {
      byStatus: { "Pending": 0, "In Progress": 0, "Completed": 0 },
      byType: {},
      byPriority: { "Low": 0, "Medium": 0, "High": 0 },
      daily: {},
      totalTasks: tasks?.length || 0,
    };

    tasks?.forEach(task => {
      data.byStatus[task.status || "Pending"]++;
      data.byPriority[task.priority || "Low"]++;
      data.byType[task.type] = (data.byType[task.type] || 0) + 1;

      const date = new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      data.daily[date] = (data.daily[date] || 0) + 1;
    });

    return data;
  }, [tasks]);

  const statusData = Object.entries(analytics.byStatus).map(([name, value]) => ({ name, value }));
  const typeData = Object.entries(analytics.byType).map(([name, value]) => ({ name, value }));
  const priorityData = Object.entries(analytics.byPriority).map(([name, value]) => ({ name, value }));
  const dailyData = Object.entries(analytics.daily).slice(-7).map(([date, count]) => ({ date, count }));

  const COLORS = ["#667eea", "#764ba2", "#f59e0b", "#10b981", "#ef4444"];
  const completionRate = analytics.totalTasks > 0 ? Math.round((analytics.byStatus["Completed"] / analytics.totalTasks) * 100) : 0;

  return (
    <motion.div
      className="analytics-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>📊 Analytics & Insights</h3>

      <div className="stats-overview">
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-value">{analytics.totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-value">{analytics.byStatus["Completed"]}</div>
          <div className="stat-label">Completed</div>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ y: -4 }}>
          <div className="stat-value">{analytics.byStatus["In Progress"]}</div>
          <div className="stat-label">In Progress</div>
        </motion.div>
      </div>

      <div className="charts-grid">
        <motion.div className="chart-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h4>Tasks by Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="chart-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h4>Tasks by Priority</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="chart-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h4>Daily Task Trend (Last 7 Days)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#764ba2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="chart-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h4>Task Type Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={typeData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
