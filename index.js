const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
	res.sendFile('index.html');
})

app.get('/admin', (req,res) => {
  res.sendFile(__dirname+'/public/admin.html');
});

let total_user = 0;

io.on('connection', (socket) => {
  io.emit('say_hello', "Hello How are you?");
  total_user++;

  io.emit('total_user', total_user)
  console.log(total_user);

	 socket.on('disconnect', () => {
      io.emit('total_user', total_user--);
    	console.log(total_user);
  	});

  	socket.on('self', (msg,id) => {
      io.emit(id, msg, id);
  	})

    socket.on('admin_self', (msg,id) => {
      io.emit('admin_self', msg, id);
    })

    socket.on('msg_to_admin', (msg,id) => {
      io.emit('msg_to_admin', msg,id);
    })

    socket.on('msg_to_client', (msg,id) => {
      io.emit('msg_from_admin', msg,id);
    })

  	socket.on('typing', (msg,id) => {
  		io.emit('typing', msg,id);
  	})

    socket.on('client_id_to_admin', (id,name) => {
      io.emit('admin_array_client', id,name);
    })
}) 

http.listen(process.env.PORT || 3000, () => {
	console.log('app start')
})