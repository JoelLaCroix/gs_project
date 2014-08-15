var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//io.sockets.clients('room') - returns number of clients in room

app.use(express.static(__dirname + '/public'));


io.on('connection',function(socket){
 console.log( 'current socket connected: ' + socket.id); // checking connection
  // player chat
  // when server recieves the player ready message
	socket.on('player ready',function (player){
	
		// check to see if the player name is empty
		if(player.length <1)
		{
			console.log('empty player name');
		}
		
		// else returns to the client chat window that player is ready
		else
		{
			//socket.on('create room', function (room){
			//socket.join(room);
			//console.log(socket.rooms);
			/**
			 *if (io.sockets.manager.rooms.indexOf(room) < 0)
			 *{
			 *	socket.join(room);
			 *}
			 */

			
			//if (true)
			//{
					io.emit('player ready', player);
					console.log( player +' is ready'); // logs player name
					
					// when server recieves chat message, message
					socket.on('chat message', function(msg){
					
						// if the length od the message array is less then 1, meaning empty message
						if (msg.length < 1)
						{
							console.log( 'empty message'); // logs message 
						}
						
						// else return player name and message to the client
						else
						{
							io.emit('chat message', {Player: player, Msg: msg});
							console.log( player +' : ' + msg); // logs message
						}
						
						// when server recieves disconnect message, return to client that the user has disconnected
						socket.on('disconnect',function(){
						io.emit('disconnect', {Player: player, Msg: "has disconnected"});
						console.log( player + ': has disconnected');
						});
					});
				//}
			//});
		}
	});
});


http.listen(3000, function(){
console.log('listening on port:3000');
});