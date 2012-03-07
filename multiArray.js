// Draws a 2d array in a preformatted text block
// usage:
//
// <pre id="arrayPrint"></pre>

function print2dArray(grid) {
		
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
	var grid = new Array(y);

	for (var i = 0; i < y; i++) {
		grid[i] = new Array(x);
		for (var k = 0; k < x; k++) {
			grid[i][k] = 0;
		}
	}
	return grid;
}
