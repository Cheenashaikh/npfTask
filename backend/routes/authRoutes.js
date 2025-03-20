const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const jwt = require('jsonwebtoken');





router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await User.create(username, password); 
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





router.post('/login', async (req, res) => {
    console.log("Login endpoint hit!"); 
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) return res.status(400).json({ error: 'User not found' });

        if (password !== user.password) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, 'secretkey');
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});









module.exports = router;
