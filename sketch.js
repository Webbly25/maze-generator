/**
 * The number of columns to draw
 * @type {number}
 */
let colCount;
/**
 * The number of rows to draw
 * @type {number}
 */
let rowCount;
/**
 * The current cell being checked
 * @type {Cell}
 */
let currentCell;

function setup() {
	frameRate(5);

	createCanvas(400, 400);
	colCount = Math.floor(width / Cell.size);
	rowCount = Math.floor(height / Cell.size);

	// create all the cells
	for (let row = 0; row < rowCount; row++) {
		for (let col = 0; col < colCount; col++) {
			new Cell(row, col);
		}
	}

	currentCell = Cell.Cells[0];
	currentCell.visited = true;
}

function draw() {
	background(51);

	const nextCell = currentCell.getNextNeighbour();
	if (nextCell) {
		currentCell = nextCell;
		currentCell.visited = true;
	}

	// draw all the cells
	Cell.Cells.forEach(c => c.draw());
}
