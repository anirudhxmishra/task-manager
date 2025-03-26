const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
    try {

        const todos = await Todo.find({ completed: false }).select("title description createdAt");

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos,
            message: todos.length ? "Incomplete Todo Data is Fetched!" : "No incomplete tasks found."
        });
    } catch (error) {
        console.error("Error fetching incomplete todos:", error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Server Error! Unable to fetch tasks."
        });
    }
};


exports.getTodoById = async (req, res) => {
    try {

        const id = req.params.id;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "No Data Found with Given ID!"
            });
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${id} Data Successfully Fetched!`
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            data: e.message,
            message: "Server Error!"
        });
    }
};
