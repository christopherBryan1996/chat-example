const express = require('express'); 
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// se podria poner todo el html aqui 
// app.get('/', (req, res)=>{
//     res.send('<h1>hola mundo</h1>')
// })

//para mejores practicas se hace asi 
app.get('/',(req, res)=>{
    res.sendFile(__dirname+ '/index.html')
})

io.on('connection', (Socket)=>{ // es importante poner exactamente 'connection'
    console.log('un usuaio conectado')
    Socket.on('disconnect',()=>{ // es importante poner exactamente 'disconnect'
        console.log('usuario desconectado')
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.broadcast.emit('h1');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

server.listen(3000, ()=>{
    console.log('listening on *:3000')
})
