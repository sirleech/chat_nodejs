

////////////////////////////
function print2dArray(grid) {
	$("#arrayPrint").empty();			
	for (var y = grid[0].length-1; y >= 0; y--){
		for (var x = 0; x < grid.length; x++){			
			$("#arrayPrint").append(grid[x][y] + "   ");
		}
		$("#arrayPrint").append("<br/></br>");
	}
}

// create a 2d array 
// array[height][width]

function createMultiArray(x,y) {
	var grid = new Array(x);

	for (var i = 0; i < x; i++) {
		grid[i] = new Array(y);
		for (var k = 0; k < y; k++) {
			grid[i][k] = 0;
		}
	}
	return grid;
}


///////////////////////////////////

// t = timeout
var t;
var circles = createMultiArray(5,5);

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
	// Creates canvas 320 × 200 at 10, 50
	//state = createMultiArray(5,5);
	print2dArray(state);
	var paper = Raphael(350, 0, 320, 200);

		// print the circles[][] array in human readable form
		for (var y = state[0].length-1; y >= 0; y--){
			for (var x = 0; x < state.length; x++){			
				// do something
				horizontalIncrement = x * 20;
				verticalIncrement = y * 20;
				circles[x][y] = paper.circle(50 + horizontalIncrement, 40 + verticalIncrement, 10);
				
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
			
			now.distributeCircleState(getState());
		});
	});
	
	
	function getState(){
		var state = createMultiArray(5,5);

		for(var x = 0; x < circles.length; x++){
			for(var y = 0; y < circles[0].length; y++){
				state[x][y] = circles[x][y].data("state");
			}
		}
		
		return state;
	}


}
