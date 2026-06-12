import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { authService } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await authService.register(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2>📝 Register</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="👤 Full Name" />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="📧 Email" />
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="🔒 Password" />

          <button type="submit" disabled={loading}>{loading ? 'Creating...' : '🎉 Create Account'}</button>
        </form>

        <p>
          Already Registered? <Link to="/">🔑 Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;