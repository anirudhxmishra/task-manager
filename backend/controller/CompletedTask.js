const TaskModel = require('../models/todo'); 

async function getCompletedTasks(req, res) {
    try {
        console.log("Fetching completed tasks...");

        const completedTasks = await TaskModel.find({ completed: true });

        return res.status(200).json({
            success: true,
            message: "Here are the completed tasks",
            data: completedTasks
        });

    } catch (error) {
        console.error("Error fetching completed tasks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

module.exports = { getCompletedTasks };
