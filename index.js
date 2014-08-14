var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(__dirname + '/public'));


//app.get('/', function(req, res){
//res.sendFile(path.resolve('public/index.html'));
//res.sendFile(__dirname +'/public/index.html');

//});

io.on('connection',function(socket){
/**
 *console.log('a user connected');
 */
 
 
  // player chat
	socket.on('player ready',function (player){
	 io.emit('player ready', player);
	 console.log( player +' is ready');
		socket.on('chat message', function(msg){
		io.emit('chat message', {Player: player, Msg: msg});
		console.log( player +' : ' + msg);
		});
	 });
	 

	
	/**
	 *socket.on('disconnect',function(){
	 *console.log('user disconnected');
	 *});
	 */

});


http.listen(3000, function(){
console.log('listening on port:3000');
});