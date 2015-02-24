var e    = require('express');
var sio  = require('socket.io');
var http = require('http');

var app = e();
var server = http.createServer( app );

var io  = sio.listen(server);

var player = -1;
var login = new Array(4);
turn = 0;

io.sockets.on('connection', function(socket) {
  socket.on('new message', function(msg) {
    io.sockets.emit('new message', msg );
	if(turn == 4){turn = 1;}
	else{turn++;}
	io.sockets.emit('turn', turn );
  });
  socket.on('password', function(msg) {
	if(msg == "one"){player = 1; login[0]=1;}
	else if(msg == "two"){player = 2; login[1]=1;}
	else if(msg == "three"){player = 3; login[2]=1;}
	else if(msg == "four"){player = 4; login[3]=1;}
	if(login[0] == 1 && turn == 0){turn = 1; io.sockets.emit('turn', turn );}
    io.sockets.emit( 'player', player );
  });
});

server.listen(3000);