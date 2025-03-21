

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BsFillCalendarDayFill } from 'react-icons/bs';
import './dashboard.css';

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("⚠ No authentication token found. Please log in.");
                    return;
                }

                console.log("📡 Fetching tasks...");
                const res = await axios.get('http://localhost:5000/api/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 200) {
                    console.log("✅ Tasks fetched successfully", res.data);
                    setTasks(res.data);
                } else {
                    throw new Error("Unexpected response status: " + res.status);
                }
            } catch (err) {
                console.error('❌ Error fetching tasks:', err.response?.data || err.message);
                setError("⚠ Failed to load tasks. Please try again.");
            }
        };
        fetchTasks();
    }, []);

    const barChartData = {
        labels: tasks.map(task => task.date),
        datasets: [
            {
                label: 'Task Completion (%)',
                data: tasks.map(task => task.percentage),
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    };

    const lineChartData = {
        labels: tasks.map(task => task.date),
        datasets: [
            {
                label: 'Collection',
                data: tasks.map(task => task.collection),
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Expenditures',
                data: tasks.map(task => task.expenditures),
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: 2,
                fill: false
            }
        ]
    };

    const pieChartData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [tasks.filter(task => task.percentage === 100).length, tasks.filter(task => task.percentage < 100).length],
                backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
                borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
                borderWidth: 1
            }
        ]
    };

    return (
        <main className="dashboard-container">
            <h1 className="dashboard-heading">Task Overview Dashboard</h1>

            {error && <p className="error-message">{error}</p>}

            <div className="cards-container">
                <div className="card">
                    <div className="card-header">
                        <BsFillCalendarDayFill className="card-icon" />
                        <h3 className="card-title">Task Progress</h3>
                    </div>
                    <div className="chart-container">
                        <Bar key={JSON.stringify(barChartData)} data={barChartData} />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <BsFillCalendarDayFill className="card-icon" />
                        <h3 className="card-title">Collection vs Expenditures</h3>
                    </div>
                    <div className="chart-container">
                        <Line key={JSON.stringify(lineChartData)} data={lineChartData} />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <BsFillCalendarDayFill className="card-icon" />
                        <h3 className="card-title">Task Completion Status</h3>
                    </div>
                    <div className="chart-container">
                        <Pie key={JSON.stringify(pieChartData)} data={pieChartData} />
                    </div>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Task</th>
                            <th>Timeline</th>
                            <th>Activities Performed</th>
                            <th>Percentage</th>
                            <th>Collection</th>
                            <th>Expenditures</th>
                            <th>Total Pending Liabilities</th>
                            <th>Recovery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.date}</td>
                                    <td>{task.task}</td>
                                    <td>{task.timeline}</td>
                                    <td>{task.activities_performed}</td>
                                    <td>{task.percentage}%</td>
                                    <td>{task.collection}</td>
                                    <td>{task.expenditures}</td>
                                    <td>{task.total_pending_liabilities}</td>
                                    <td>{task.recovery}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="no-data">No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Dashboard;