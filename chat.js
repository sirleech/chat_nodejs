var fs = require('fs');
var server = require('http').createServer(function(req, response){
  fs.readFile('helloworld.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'});  
    response.write(data);  
    response.end();
  });
});

server.listen(8888);
var nowjs = require("now");
var everyone = nowjs.initialize(server);
var names = new Array();
var messages = new Array();
var messageCount = 0;
var userNames = new Array();
var onlineUsersCount = 0;

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

function refreshUserList(){
	everyone.getUsers(function (users) {
		var userString = "";
		for (var i = 0; i < users.length; i ++) {
			userString = userString + ", " + userNames[users[i]];
		}
  	everyone.now.receiveUserList("There are " + users.length + " people online now." + userString + " =  people online now.");
	});	
}
