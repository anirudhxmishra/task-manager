const express = require("express")
const app = express()

const cors = require('cors');
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const todoRoutes = require("./routes/Todo");

app.use("/api/", todoRoutes);

app.listen(PORT,()=>{
    console.log(`Server Started Successfully at ${PORT}`);
})

const dbConnect = require("./config/database")
dbConnect();

app.get("/",(req, res)=>{
    res.send(`<h1>This is Homepage</h1>`)
})