const express=require("express");
const app=express();
const path=require("path");

port=3700;
const http=require("http").createServer(app);
app.use(express.static("./public"));
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(`./index.html`))
   
})

http.listen(port,()=>{console.log("port start...")});

//socket setup

// const io=require("socket.io")(http)  //socket.io nai hhtp server jode coonect kari yu hai nai khaber pade kaya server jode kam karva nu 
// //coonect to broweser or cilent
// io.on("connection",()=>{
//     //aa callbacke function tare call thase jare koi browser connect thase
//     console.log("connection..");
// })

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})