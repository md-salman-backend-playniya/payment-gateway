import express from "express"
import dotenv from "dotenv"
dotenv.config();
const app = express();
const PORT =  process.env.PORT


app.get("/", (req, res)=>{
    res.send("hi there")
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
})