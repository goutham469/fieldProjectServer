const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', // Replace with your client's origin
      methods: ['GET', 'POST'],
    },
  });
  
let users = []

io.on("connect",(socket)=>{
    console.log("new user connected ",socket.id);

    socket.on("login",(data)=>{
        console.log(data)
        let time = new Date();
        users.push({"userName":data.userName,"socketId":socket.id,"loginTime":time.getTime()})
        console.log("all users ",users)
    })

    socket.on('logout',(data)=>{
        console.log("a user logged out, ",data)
        users = users.filter(user=>user.socketId!=data.socketId)
        console.log("all users ",users)
    })

    socket.on("sendMessage",(data)=>{
        let receivers = []
        
        users.forEach(user=>{
            if(user.userName == data.receiver)
            {
                receivers.push(user.socketId)
            }
        })

        receivers.forEach(x=>{
            socket.to(x).emit("receiveMessage",{"sender":data.sender,"message":data.message})
        })  

        console.log("messages sent to all ,",receivers)
    }) 


    socket.on('disconnect',()=>{
        console.log("a user disconnected ",socket.id)
        users = users.filter(data=>data.socketId!=socket.id)
        console.log("all users ",users)
    })
})

http.listen(5000,()=>console.log("socket running on port 5000"))