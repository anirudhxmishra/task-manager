const Todo= require("../models/todo");

exports.createTodo = async(req, res)=> {
    try{
 
        const{title, description,complete}= req.body;

        const completed = false;

        const response = await Todo.create({title,description, completed});


        res.status(200).json({
            success:true,
            data:response,
            messege:'Entry Created Successfully'
         }
        ); 
    }
    catch(e){
        console.error(e);
        console.log(e);
        res.status(500)
        .json({
            success:false,
            data:'Internal server error',
            messege:e.messege,
        })
    }
}