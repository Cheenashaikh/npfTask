import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
        date: '',
        task: '',
        timeline: '',
        activitiesPerformed: '',
        percentage: '',
        collection: '',
        expenditures: '',
        totalPendingLiabilities: '',
        recovery: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/tasks', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Task created successfully!');
            console.log(response.data);
        } catch (err) {
            console.error('Error creating task:', err);
            alert('Failed to create task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} required />
            <input type="date" name="date" placeholder="Date" value={formData.date} onChange={handleChange} required />
            <input type="text" name="task" placeholder="Task" value={formData.task} onChange={handleChange} required />
            <input type="number" name="timeline" placeholder="Timeline (days)" value={formData.timeline} onChange={handleChange} required />
            <textarea name="activitiesPerformed" placeholder="Activities Performed" value={formData.activitiesPerformed} onChange={handleChange} required />
            <input type="number" name="percentage" placeholder="Percentage" value={formData.percentage} onChange={handleChange} required />
            <input type="number" name="collection" placeholder="Collection" value={formData.collection} onChange={handleChange} required />
            <input type="number" name="expenditures" placeholder="Expenditures" value={formData.expenditures} onChange={handleChange} required />
            <input type="number" name="totalPendingLiabilities" placeholder="Total Pending Liabilities" value={formData.totalPendingLiabilities} onChange={handleChange} required />
            <input type="number" name="recovery" placeholder="Recovery" value={formData.recovery} onChange={handleChange} required />
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;