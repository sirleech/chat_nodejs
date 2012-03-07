// Draws a 2d array in a preformatted text block
// usage:
//
// <pre id="arrayPrint"></pre>

function print2dArray(grid) {

	$("#arrayPrint").append("  ");
	for (var k = 0; k < grid[0].length; k++){
		$("#arrayPrint").append("<strong> " + k + "</strong>  ");
	}
	
	$("#arrayPrint").append("<br/></br>");
	
	for (var i = 0; i < grid.length; i++){
		for (var k = 0; k < grid[0].length; k++){
			if (k == 0)
				$("#arrayPrint").append("<strong>" + i + "</strong>  ");
				
			$("#arrayPrint").append(grid[i][k] + "   ");
		}
		$("#arrayPrint").append("<br/></br>");
	}
}

// create a 2d array 
// array[height][width]

function createMultiArray(x,y) {
	var grid = new Array(y);

	for (var i = 0; i < y; i++) {
		grid[i] = new Array(x);
		for (var k = 0; k < x; k++) {
			grid[i][k] = 0;
		}
	}
	return grid;
}
