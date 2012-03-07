// Draws a 2d array in a preformatted text block
// usage:
//
// <pre id="arrayPrint"></pre>

MultiArray = function() {
}

MultiArray.prototype = {
    create: function (x,y) {
        return createMultiArray(x,y);
    }
}

function print2dArray(grid) {
	$("#arrayPrint").empty();			
	for (var y = 0; y < grid[0].length; y++){
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
