var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(__dirname + '/index.html');
});

var users=[]; 
// Register events on socket connection
io.on('connection', function(socket){
	socket.on('user name',function(user_name){
		users.push({id:socket.id,user_name:user_name});
		len=users.length;
		io.emit('userjoin', 'System', user_name);
    });
  	socket.on('chatMessage', function(from, msg, to){
  		for(var i=0;i<users.length;i++){
  			if(users[i].user_name==to){
	    		socket.broadcast.to(users[i].id).emit( 'chatMessage', from, msg, to );
	    	}
    	}
  	});
});
 
// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
