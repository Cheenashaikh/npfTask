
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { BsFillCalendarDayFill } from 'react-icons/bs';
// import { FaMoneyBillWave } from 'react-icons/fa';
// import './dashboard.css'; 

// const Dashboard = () => {
//     const [tasks, setTasks] = useState([]);

//     useEffect(() => {
//         const fetchTasks = async () => {
//             const token = localStorage.getItem('token');
//             const res = await axios.get('http://localhost:5000/api/tasks/', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setTasks(res.data);
//         };
//         fetchTasks();
//     }, []);

//     const data = {
//         labels: tasks.map(task => task.date),
//         datasets: [
//             {
//                 label: 'Percentage',
//                 data: tasks.map(task => task.percentage),
//                 backgroundColor: 'rgba(75,192,192,0.6)'
//             }
//         ]
//     };

//     return (
//         <main className="main-container">
//             <h1>Dashboard</h1>
//             <div className="main-cards">
//                 <div className="card">
//                     <div className="card-inner">
                       
//                         <h3>Task Progress</h3>
//                     </div>
//                     <Bar data={data} />
//                 </div>
//             </div>

//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Task</th>
//                             <th>Timeline</th>
//                             <th>Activities Performed</th>
//                             <th>Percentage</th>
//                             <th>Collection</th>
//                             <th>Expenditures</th>
//                             <th>Total Pending Liabilities</th>
//                             <th>Recovery</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tasks.map(task => (
//                             <tr key={task.id}>
//                                 <td>{task.date}</td>
//                                 <td>{task.task}</td>
//                                 <td>{task.timeline}</td>
//                                 <td>{task.activities_performed}</td>
//                                 <td>{task.percentage}%</td>
//                                 <td>{task.collection}</td>
//                                 <td>{task.expenditures}</td>
//                                 <td>{task.total_pending_liabilities}</td>
//                                 <td>{task.recovery}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </main>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { BsFillCalendarDayFill } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTasks(res.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };
        fetchTasks();
    }, []);

    const data = {
        labels: tasks.map(task => task.date),
        datasets: [
            {
                label: 'Percentage',
                data: tasks.map(task => task.percentage),
                backgroundColor: 'rgba(75,192,192,0.6)'
            }
        ]
    };

    return (
        <main className="main-container">
            <h1>Dashboard</h1>
            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <BsFillCalendarDayFill className="card-icon" style={{ color: "#007bff" }} />
                        <h3>Task Progress</h3>
                    </div>
                    <Bar data={data} />
                </div>
            </div>

            <div className="table-container">
                <table>
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
                        {tasks.map(task => (
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
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Dashboard;