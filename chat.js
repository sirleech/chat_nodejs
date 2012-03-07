var fs = require('fs');
var path = require('path');
var http = require('http');
var ma = require('./MultiArray.js');

var server = http.createServer(function (request, response) {
     
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(8888);
 
console.log('Server running at http://127.0.0.1:8888/');

var nowjs = require("now");
var everyone = nowjs.initialize(server);
var names = new Array();
var messages = new Array();
var messageCount = 0;
var userNames = new Array();
var onlineUsersCount = 0;

ma = new MultiArray();
var gameBoardState = ma.create(6,6);

everyone.connected(function(){
  console.log("Joined: " + this.now.name);
  console.log("id: " + this.user.clientId);
  
  userNames[this.user.clientId] = this.now.name;
  
  if (messages.length < 10) {
		for (var i = 1; i < messages.length; i++) {
		  this.now.receiveMessageNoNotifications(names[i], messages[i]);
		}
	} else {
		for (var i = messageCount-10 ; i <= messageCount; i++) {
		  this.now.receiveMessageNoNotifications(names[i], messages[i]);
		}
	}
	refreshUserList();
	this.now.receiveState(gameBoardState);
	
});


everyone.disconnected(function(){
  console.log("Left: " + this.now.name);
  
  refreshUserList();
	
});

everyone.now.distributeMessage = function(message){
	everyone.now.receiveMessage(this.now.name, message);
	messageCount++;
	names[messageCount] = this.now.name;
	messages[messageCount] = message;
	
	console.log(messageCount + " messages");
};

everyone.now.distributeCircleState = function (state) {
	gameBoardState = state;
	everyone.now.receiveState(state);
}

function refreshUserList(){
	everyone.getUsers(function (users) {
		var userString = "";
		for (var i = 0; i < users.length; i ++) {
			userString = userString + ", " + userNames[users[i]];
		}
  	everyone.now.receiveUserList("There are " + users.length + " people online now." + userString + " =  people online now.");
	});	
}
