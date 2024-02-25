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
/**
 * @type {Cell[]}
 */
let cellStack = [];

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

	currentCell.highlighted = false;

	const nextCell = currentCell.getNextNeighbour();
	if (nextCell) {
		// cell has unvisited neighbour

		if (nextCell.count > 1) {
			// only push to stack if there were other options available
			cellStack.push(currentCell);
		}

		Cell.setWalls(currentCell, nextCell.cell);

		currentCell = nextCell.cell;
		currentCell.visited = true;
	} else {
		// cell has no unvisted neighbours

		currentCell = cellStack.pop();
	}

	// draw all the cells
	if (currentCell) {
		currentCell.highlighted = true;
	}
	Cell.Cells.forEach(c => c.draw());

	// finished generating
	if (currentCell === undefined) {
		noLoop();
		return;
	}
}
