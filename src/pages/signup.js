import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./signup.css";
import { useNavigate } from "react-router-dom";


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
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    
          
            localStorage.setItem('token', res.data.token);
    
            
            onLogin(res.data.user);  
    
           
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError("Invalid credentials, please try again."); 
        }
    };
    

    return (
        <div className="signUpContainer">
            <div className="container_left">
                <h2>Welcome Back</h2>
                <p className="welcome-text">
                    We’re glad to have you here again! Sign in to access your account
                    and continue your journey with us.
                </p>
            </div>
            <div className="container_right">
                <div className="content">
                    {/* <img
                        src="https://timepay.com.pk/wp-content/uploads/2024/08/timepayweblogo.png"
                        alt="logo"
                        className="logo"
                    /> */}
                    <p className="header">Sign in to Continue</p>
                    <form onSubmit={handleClick}>
                        <div className="input_group">
                            <input
                                value={username}
                                type="text"
                                id="username"
                                placeholder=" "
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input_group">
                            <input
                                value={password}
                                type="password"
                                id="password"
                                placeholder=" "
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit" disabled={false}>Sign in</button>

                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;