//////////////////////////

var paper;
var circles;

$(document).ready(function(){
	
  now.receiveState = function(state,name){
		if (paper == null)
  		// Creates canvas 900 × 680 at 350, 20	
  		paper = Raphael(350, 20, 900, 680);
  		
  	paper.clear();
  	draw(state,name);
  }
  
  now.name = prompt("What's your name?", "");
  
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


//////////////////
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

// state = [x][y] is a 2d array
// 0 = white, 1 = red, 2 = green


function draw(state,name){
	
	print2dArray(state);
	$("#lastMoveUser").empty();
	if (now.name == name)
		name = "<em>Me</em>";
	
	if (name != "hasNotBeenPlayed")	
		$("#lastMoveUser").append("Last move by " + name + " on xx:xx xx");
	
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
				
				switch(state[x][y]){
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
			
			//alert(el.data("x") + "," + el.data("y"));
			now.distributeCircleState(getState());
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
