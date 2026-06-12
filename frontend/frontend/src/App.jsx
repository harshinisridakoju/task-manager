import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { useState, useEffect, createContext, useContext } from "react";

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

function NavBar() {
  const [user, setUser] = useState(null);
  const { isDark, toggleTheme, notifications } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const initials = user ? user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() : "";
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        whileHover={{ scale: 1.1, color: "#764ba2" }}
        transition={{ duration: 0.3 }}
      >
        🚀 Task Manager
      </motion.h1>

      <div className="nav-links">
        {!user ? (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/">🔑 Login</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register">📝 Register</Link>
            </motion.div>
          </>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/dashboard">📋 Dashboard</Link>
          </motion.div>
        )}
      </div>

      <div className="profile-area">
        {user && (
          <>
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </motion.button>
            <motion.div className="notification-bell" whileHover={{ scale: 1.1 }}>
              🔔 <span className="notification-badge">{unreadCount}</span>
            </motion.div>
            <div className="profile" onClick={() => {}}>
              <div className="avatar">{initials}</div>
              <div className="profile-info">
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, notifications, setNotifications }}>
      <AppContent />
    </ThemeContext.Provider>
  );
}

export default App;