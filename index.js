const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.sendFile('index.html');
})

io.on('connection', (socket) => {

	socket.on('disconnect', () => {
    	console.log('user disconnected');
  	});

  	socket.on('chat', (msg,id) => {
  		io.emit('chat', msg,id);
  	})

  	socket.on('typing', (msg,id) => {
  		io.emit('typing', msg,id);
  	})
}) 

http.listen(process.env.PORT || 3000, () => {
	console.log('app start')
})