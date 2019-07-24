var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
  console.log(__dirname);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection',(socket)=>{
  console.log('A user connected');

  socket.on('disconnect',()=>{
    console.log('a user just disconnected');
  });

  socket.on('created',(data)=>{
    socket.broadcast.emit('created',data);
  });

  socket.on('chat-message',(data)=>{
    socket.broadcast.emit('chat-message',data);
  });

  socket.on('typing',(data)=>{
    socket.broadcast.emit('typing',data);
  });
  
  socket.on('stoppedTyping',(data)=>{
    socket.broadcast.emit('stoppedTyping',data);
  });

  socket.on('joined',data=>{
    socket.broadcast.emit('joined',data);
  });

  socket.on('left',data =>{
    socket.broadcast.emit('left',data);
  });

});