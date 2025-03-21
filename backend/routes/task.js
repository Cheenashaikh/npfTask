const express = require("express");
const router = express.Router();
const Task = require('../models/task');

// ✅ Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.findAll(); // Correct usage
        res.json(tasks);
    } catch (err) {
        console.error("❌ Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get tasks by user ID
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.findByUserId(userId); // Correct usage
        res.json(tasks);
    } catch (err) {
        console.error("❌ Error fetching user tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Create a new task
router.post("/", async (req, res) => {
    try {
        const { userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery } = req.body;

        if (!userId || !task) {
            return res.status(400).json({ error: "User ID and Task are required" });
        }

        const taskId = await Task.create(userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery);
        res.status(201).json({ message: "Task created successfully", taskId });
    } catch (err) {
        console.error("❌ Error creating task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

);

module.exports = router;
