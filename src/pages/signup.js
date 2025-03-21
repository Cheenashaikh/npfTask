
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./signup.css";
import img from "../img/NPF Logo-1.png";

function SignUp({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🔹 Sending login request with:", { username, password });

      const res = await axios.post("http://localhost:5000/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Login successful! Response:", res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      console.log(localStorage);

      onLogin(res.data.user);
      navigate("/dashboard");

    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="signUpContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container_left">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome Back
        </motion.h2>
        <motion.p
          className="welcome-text"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          We’re glad to have you here again! Sign in to access your account and continue your journey with us.
        </motion.p>
      </div>
      <motion.div
        className="container_right"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.img
          src={img}
          alt="logo"
          className="logo"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div className="content">
          <motion.p
            className="header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Sign in to Continue
          </motion.p>
          <form onSubmit={handleClick}>
            <motion.div
              className="input_group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <input
                value={username}
                type="text"
                id="username"
                placeholder=" "
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Username</label>
            </motion.div>
            <motion.div
              className="input_group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <input
                value={password}
                type="password"
                id="password"
                placeholder=" "
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </motion.div>
            <motion.button className="button"
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>

            {error && (
              <motion.p
                className="error"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                {error}
              </motion.p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SignUp;