import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signup";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import TaskForm from "./pages/task"

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const handleLogin = (user) => {
    console.log("User logged in:", user);
    if (!user) {
      console.error("Invalid user object:", user);
      return;
    }
    try {
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(user);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const handleLogOut = () => {
    try {
      localStorage.removeItem("user");
      setLoggedIn(null);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return (
    <div className="App">
      <Router>
        <div className="app-container">
          {loggedIn && <Sidebar user={loggedIn} onLogout={handleLogOut} />}
          <div className="content-container">
            <Routes>

              <Route
                path="/"
                element={loggedIn ? <Navigate to="/dashboard" replace /> : <SignUp onLogin={handleLogin} />}
              />


              <Route
                path="/dashboard"
                element={loggedIn ? <Dashboard user={loggedIn} /> : <Navigate to="/" replace />}
              />


              <Route
                path="/task"
                element={loggedIn ? <TaskForm user={loggedIn} /> : <Navigate to="/" replace />}
              />
            </Routes>




          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

