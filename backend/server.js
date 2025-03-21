const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());  // Important for JSON request body parsing

// ✅ Test Database Connection
db.getConnection()
    .then(() => console.log("✅ Database connected"))
    .catch(err => console.error("❌ Database connection failed:", err));

// ✅ Routes
app.use("/api/tasks", require("./routes/task"));
app.use("/api/auth", require("./routes/auth"));

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
