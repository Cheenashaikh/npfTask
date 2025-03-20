const db = require('../config/db');

class Task {
    static async create(userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery) {
        const [result] = await db.execute(
            'INSERT INTO tasks (user_id, date, task, timeline, activities_performed, percentage, collection, expenditures, total_pending_liabilities, recovery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, date, task, timeline, activitiesPerformed, percentage, collection, expenditures, totalPendingLiabilities, recovery]
        );
        return result;
    }

    static async findByUserId(userId) {
        const [rows] = await db.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        return rows;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM tasks');
        return rows;
    }
}

module.exports = Task;