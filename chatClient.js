// t = timeout
var t;
var circles;

//////////////////
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

// state = [x][y] is a 2d array
// 0 = white, 1 = red, 2 = green


function draw(state){
	
	print2dArray(state);
	
	circles = createMultiArray(state.length,state[0].length);
	// Creates canvas 320 × 200 at 30, 100	
	var paper = Raphael(300, 100, 320, 200);
	paper.clear();

		// print the circles[][] array in human readable form
		for (var x = 0; x < state.length; x++){
			for (var y = 0; y < state[0].length; y++){			
				// do something
				horizontalIncrement = x * 20;
				verticalIncrement = y * 20;
				circles[x][y] = paper.circle(50 + horizontalIncrement, 50 + verticalIncrement, 10);
				
				circles[x][y].data("x",x);
				circles[x][y].data("y",y);
				circles[x][y].attr("stroke", "gray");
				
				switch(state[x][y]){
					case 0:
						circles[x][y].attr("fill", "white");
						circles[x][y].data("color","white");
						circles[x][y].data("state",0);
						break;
					case 1:
						circles[x][y].attr("fill", "red");
						circles[x][y].data("color","red");
						circles[x][y].data("state",1);
						break;
					case 2:
						circles[x][y].attr("fill", "green");
						circles[x][y].data("color","green");
						circles[x][y].data("state",2);
						break;
				}
				
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
