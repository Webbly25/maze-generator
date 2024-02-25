let colCount, rowCount;
const cells = [];

function setup() {
	createCanvas(400, 400);
	colCount = Math.floor(width / Cell.cellSize);
	rowCount = Math.floor(height / Cell.cellSize);

	// create all the cells
	for (let row = 0; row < rowCount; row++) {
		for (let col = 0; col < colCount; col++) {
			cells.push(new Cell(row, col));
		}
	}
}

function draw() {
	background(51);

	// draw all the cells
	cells.forEach(c => c.draw());
}
