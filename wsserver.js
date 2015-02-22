var e    = require('express');
var sio  = require('socket.io');
var http = require('http');

var app = e();
var server = http.createServer( app );

var io  = sio.listen(server);

var player = -1;

io.sockets.on('connection', function(socket) {
  socket.on('new message', function(msg) {
    io.sockets.emit('new message', msg );
  });
  socket.on('password', function(msg) {
	if(msg == "one"){player = 1;}
	else if(msg == "two"){player = 2;}
	else if(msg == "three"){player = 3;}
	else if(msg == "four"){player = 4;}
    io.sockets.emit('player', player );
  });
});



server.listen(3000);