const Todo = require("../models/todo");

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Request Params:", req.params);
        
        console.log("Raw Body:", req.body);
        
        const { title, description, completed } = req.body || {};

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty! Ensure you are sending data correctly.",
            });
        }

        console.log("Parsed Body:", { title, description, completed });

        const todo = await Todo.findByIdAndUpdate(
            id,  
            { title, description, completed, updatedAt: new Date() },
            { new: true, runValidators: true }  
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: "Updated Successfully!",
        });

    } catch (error) {
        console.error("Update Todo Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,  
        });
    }
};
