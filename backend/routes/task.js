const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createTask, getTasksByUserId } = require('../controllers/taskController');
const { getAllTasks } = require('../controllers/taskController');


router.post('/tasks', async (req, res) => {
    const { userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery } = req.body;
    try {
        await Task.create(userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery);
        res.status(201).json({ message: 'Task created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/tasks/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const tasks = await Task.findByUserId(userId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/tasks', createTask);


router.get('/tasks/:userId', getTasksByUserId);
router.get('/tasks', getAllTasks);

module.exports = router;
