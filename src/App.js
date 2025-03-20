import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signup";
import Sidebar from "./components/sidebar";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  const handleLogin = (user) => {
    setLoggedIn(user);
  };

  const handleLogOut = () => {
    setLoggedIn(null);
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
                element={
                  loggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <SignUp onLogin={handleLogin} />
                  )
                }
              />
             

            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
