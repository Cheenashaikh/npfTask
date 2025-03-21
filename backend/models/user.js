const db = require('../config/db');

class User {
    static async create(username, password) {
        const [result] = await db.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password]  
        );
        return result;
    }

    static async findByUsername(username) {
        try {
            const result = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
            const rows = result[0]; // Get the first array from result
            return rows.length > 0 ? rows[0] : null; // Return the first row or null if no user found
        } catch (err) {
            console.error("Database error:", err);
            throw err;
        }
    }
    
    
    
}
module.exports = User;