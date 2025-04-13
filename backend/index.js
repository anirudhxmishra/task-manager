const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",  // Change to your frontend URL on Render later
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());

// Connect to DB
const dbConnect = require("./config/database");
dbConnect();

// Routes
const todoRoutes = require("./routes/Todo");
app.use("/api", todoRoutes);

// Serve frontend static files (after build)
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Handle all other routes to support React Router
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server Started Successfully at ${PORT}`);
});
