const express = require('express')

const app = express()

const port = 8081;

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is running at 8081"
    })
})

app.get('*',(req,res)=>{
    res.status(500).json({
        message:"Page Not found"
    })
})
app.listen(port,()=>{
    console.log("Server is running at 8081");
})