const express=require('express');
const app=express();
const socketio=require('socket.io')
app.set('view engine','ejs')
const path=require('path');
const { disconnect } = require('process');
app.use(express.static(path.join(__dirname,"public")))
app.get('/',(req,res)=>{
    res.render('index')
})

const server=app.listen(3000,()=>
console.log('Listening to port 3000'))

const io=socketio(server);
io.on('connection',socket=>{
   
socket.on('send-location-from-frontend',(data)=>{
    //Now we will send to all the user or all the device connected .it will be done by below
    io.emit('send-location-to-all-connected-user-to-frontend',{id:socket.id,...data})

})
socket.on('disconnect',function(){
    console.log('userDisconnected',socket.id);
    io.emit('user-disconnected',{disconnectUserId:socket.id})
})
    console.log('connected',socket.id);
})