// const Task = require('../models/task');


// const createTask = async (req, res) => {
//     const { userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery } = req.body;

  
//     if (!userId || !date || !task || !timeline || !activitiesPerformed || !percentage || !collection || !expenditures || !totalPendingLiabilities || !recovery) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
       
//         await Task.create(userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery);

   
//         res.status(201).json({ message: 'Task created successfully' });
//     } catch (err) {
//         console.error('Task creation error:', err); 
//         res.status(500).json({ error: 'Internal Server Error', details: err.message });
//     }
// };


// const getTasksByUserId = async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ error: 'User ID is required' });
//     }

//     try {
        
//         const tasks = await Task.findByUserId(userId);

      
//         res.json(tasks);
//     } catch (err) {
//         console.error('Task retrieval error:', err); 
//         res.status(500).json({ error: 'Internal Server Error', details: err.message });
//     }
// };


// const getAllTasks = async (req, res) => {
//     try {
      
//         const tasks = await Task.findAll();

     
//         res.json(tasks);
//     } catch (err) {
//         console.error('Task retrieval error:', err); 
//         res.status(500).json({ error: 'Internal Server Error', details: err.message });
//     }
// };

// module.exports = { createTask, getTasksByUserId, getAllTasks };
const Task = require('../models/task');


const createTask = async (req, res) => {
    const { userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery } = req.body;

  
    if (!userId || !date || !task || !timeline || !activitiesPerformed || !percentage || !collection || !expenditures || !totalPendingLiabilities || !recovery) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
       
        await Task.create(userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery);

   
        res.status(201).json({ message: 'Task created successfully' });
    } catch (err) {
        console.error('Task creation error:', err); 
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};


const getTasksByUserId = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        
        const tasks = await Task.findByUserId(userId);

      
        res.json(tasks);
    } catch (err) {
        console.error('Task retrieval error:', err); 
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};


const getAllTasks = async (req, res) => {
    try {
      
        const tasks = await Task.findAll();

     
        res.json(tasks);
    } catch (err) {
        console.error('Task retrieval error:', err); 
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};

module.exports = { createTask, getTasksByUserId, getAllTasks };