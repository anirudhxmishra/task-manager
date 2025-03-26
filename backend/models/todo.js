const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        
            maxLength: 50,
        },
        description: {
            type: String,
            required: true,
            maxLength: 50,
        },
        createdAt: {
            type: Date,  
            required: true,
            default: Date.now,  
        },
        updatedAt: {
            type: Date, 
            required: true,
            default: Date.now, 
        },
        completed:{
            type:Boolean,
            required:true,
        }
    }
);

module.exports = mongoose.model("Todo", todoSchema);
