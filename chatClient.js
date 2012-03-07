// t = timeout
var t;
var circles = [];

function clearMessageNotification(){
	$("#notification").text("");
	$("#notification").css("background","white");
	$("#notification").css("height","0px");
	clearTimeout(t);
}

function newMessageNotification(t){
	$("#notification").text("You have a new message!");
	$("#notification").css("background","green");
	t = setTimeout("blink()",1000);
}

var blazo = true;

function blink(){	
	if (blazo == true)	{
		$("#notification").css("background","lightgreen");
		blazo = false;
		t = setTimeout("blink()",1000);
	} else {
		$("#notification").css("background","green");
		blazo = true;
		t = setTimeout("blink()",1000);
	}
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

// state = [0,0,0,0,0] is an array
// 0 = white, 1 = red, 2 = green
function draw(state){
	// Creates canvas 320 × 200 at 10, 50
	
	var paper = Raphael(350, 0, 320, 200);
			
		var i = 0;
		var incr;
		// Creates circle at x = 50, y = 40, with radius 10
		
		for(var i = 0; i < 5; i++){
			incr = i * 20;
			circles[i] = paper.circle(50 + incr, 40, 10);
			
			switch(state[i]){
				case 0:
					circles[i].attr("fill", "white");
					circles[i].data("color","white");
					circles[i].data("state",0);
					break;
				case 1:
					circles[i].attr("fill", "red");
					circles[i].data("color","red");
					circles[i].data("state",1);
					break;
				case 2:
					circles[i].attr("fill", "green");
					circles[i].data("color","green");
					circles[i].data("state",2);
					break;
			}
		}
	
	
	paper.forEach(function (el) {
    
    el.click(function changeColor() {
    	
			if (el.data("color") == "red") {
				el.attr("fill", "green");
				el.data("color","green");
				el.data("state",2)
			} else {
				el.attr("fill", "red");
				el.data("color","red");
				el.data("state",1)
			}
			
			now.distributeCircleState(getState());
		});
	});
	
	function getState(){
		var state = [];

		for(var i = 0; i < circles.length; i++){
			state[i] = circles[i].data("state");
		}
		
		return state;
	}

	for (var i = 0; i < circles.length; i++){
		//circles[i].attr("fill", "#fff");
	}

}
