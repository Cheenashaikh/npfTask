
import React, { useState,useEffect } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import img from "../img/NPF Logo-1.png"

function Sidebar({ user, onLogout }) {
    const [expended, setExpended] = useState(window.innerWidth > 576);
    useEffect(() => {
        const handleResize = () => {
            setExpended(window.innerWidth > 576);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={expended ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
            <div className="nav-upper">
                <div className="nav-heading">
                    {expended && (
                        <div className="nav-brand">
                            <img src={img} alt="" srcset="" />
                        </div>
                    )}
                    <button className={expended ? "hamburger hamburger-in" : "hamburger hamburger-out"} onClick={() => setExpended(!expended)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={expended ? "nav-menu" : "nav-menu menu-item-NX"}>
                    <div className="nav-option option1">
                        <i className="bi bi-house-door" id="one"></i> 
                        <Link to="/dashboard" style={{ textDecoration: "none" }}>
                            <h3 id="one">Dashboard</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                    <i className="bi bi-clipboard" id="two"></i>
                        <Link to="/task" style={{ textDecoration: "none" }}>
                            <h3 id="two">Input Task</h3>
                        </Link>
                    </div>

                    <div className="nav-option option1">
                        <i className="bi bi-box-arrow-right" id="three"></i> 
                        <Link to="/" onClick={onLogout} style={{ textDecoration: "none" }}>
                            <h3 id="three">Logout</h3>
                        </Link>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default Sidebar;