//////////////////////////

var paper;
var circles;

$(document).ready(function(){
	
  now.receiveState = function(state,name,lastMoveDateTime){
		if (paper == null)
  		// Creates canvas 900 × 680 at 350x, 40y	
  		paper = Raphael(350, 40, 900, 680);
  		
  	paper.clear();
  	draw(state,name,lastMoveDateTime);
  }
  
  now.receiveMove = function (x,y,state,name,lastMoveDateTime) {
		setCircleColour(x,y,state);
		// deserialize the date object? it's not transferred as Date()?	
		var date = new Date(lastMoveDateTime.toLocaleString());
		dateString = date.getHours() + ":" + date.getMinutes();
		$("#lastMoveUser").empty();
		$("#lastMoveUser").append("Last move by " + name + " on " + dateString);
	}
  
  now.name = prompt("What's your name?", "");
  $("#me").append(now.name);
  
  now.receiveMessageNoNotifications = function(name, message){
  	appendMessage(name,message);
  }
    
  now.receiveMessage = function(name, message){
    appendMessage(name,message);
		
		if (name != now.name) {
			$("#notification").text("You have a new message!");
			playSound("beeplo.wav");
		}
  }
  
  now.receiveUserList = function(userListString) {
  	$("#users").text(userListString);
  }
  
  $("#send-button").click(function(){
    distribute();
  });
  
  $("#text-input").keypress(function(event) {
  if (event.which == 13) {
     distribute();
   }
	});

	// clear messages on click 
	$(window).click(function() {
  	clearMessageNotification();
  });
  $("#text-input").click(function() {
  	clearMessageNotification();
  });
  
	
});


//////////////////////////////////////////////////////////


function clearMessageNotification(){
	$("#notification").text("");
	$("#notification").css("background","white");
	//$("#notification").css("height","0px");
}

function appendMessage(name,message){
	if (name == now.name) {
		$("#messages").append("<div class='message'>" + "<i>" + name + "</i>" + ": " + message + "</div>");
	} else {
		$("#messages").append("<div class='message'>" + name + ": " + message + "</div>");
	}
}

function distribute(){
	now.distributeMessage($("#text-input").val());
	$("#text-input").val("");
	if ($("#messages div").length > 10){
		$("#messages > div:first").remove();
	}
}

function playSound( url ){   
  document.getElementById("sound").innerHTML="<embed src='"+url+"' hidden=true autostart=true loop=false>";
}


function setCircleColour(x,y,state) {
	switch(state){
		case 0:
			circles[x][y].attr("fill", "white");
			circles[x][y].data("state",0);
			break;
		case 1:
			circles[x][y].attr("fill", "gray");
			circles[x][y].data("state",1);
			break;
		case 2:
			circles[x][y].attr("fill", "black");
			circles[x][y].data("state",2);
			break;
	}
}



//########################################################
//////////////////////////////////////////////////////////



// draw()


// state = [x][y] is a 2d array
// 0 = white, 1 = red, 2 = green

//////////////////////////////////////////////////////////
//########################################################

function draw(state,name,lastMoveDateTime){
	
	print2dArray(state);
	$("#lastMoveUser").empty();
	if (now.name == name)
		name = "<em>Me</em>";
	
	// deserialize the date object? it's not transferred as Date()?	
	var date = new Date(lastMoveDateTime.toLocaleString());
	dateString = date.getHours() + ":" + date.getMinutes();
	
	if (name != "hasNotBeenPlayed")	
		$("#lastMoveUser").append("Last move by " + name + " on " + dateString);
	
	circles = createMultiArray(state.length,state[0].length);

	// print the circles[][] array in human readable form
	for (var x = 0; x < state.length; x++){
		for (var y = 0; y < state[0].length; y++){			
			// do something
			horizontalIncrement = x * 20;
			verticalIncrement = y * 20;
			circles[x][y] = paper.circle(20 + horizontalIncrement, 20 + verticalIncrement, 10);
			
			circles[x][y].data("x",x);
			circles[x][y].data("y",y);
			circles[x][y].attr("stroke", "gray");
			
			setCircleColour(x,y,state[x][y]);
			
		}
	}
	
	paper.forEach(function (el) {
    el.click(function toggleColor() {
    	
			if (el.data("state") == 2) {
				state = 0;
				el.data("state",state)
			} else {
				state = el.data("state");
				state++;
				el.data("state",state)
			}

			now.distributeMove(el.data("x"),el.data("y"),el.data("state"));
		});
	});
	
	
	function getState(){
		var state = createMultiArray(circles.length,circles[0].length);

		for(var x = 0; x < circles.length; x++){
			for(var y = 0; y < circles[0].length; y++){
				state[x][y] = circles[x][y].data("state");
			}
		}
		
		return state;
	}
}
