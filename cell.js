class Cell {
	static cellSize = 40;

	rowIdx;
	colIdx;

	drawTopWall = true;
	drawRightWall = true;
	drawBottomWall = true;
	drawLeftWall = true;

	/**
	 * Create a new cell
	 * @param {number} rowIdx The index of the row (0 being top)
	 * @param {number} colIdx The index of the col (0 being left)
	 */
	constructor(colIdx, rowIdx) {
		this.rowIdx = rowIdx;
		this.colIdx = colIdx;
	}

	/**
	 * Draw all the cell walls
	 */
	resetWalls() {
		this.drawTopWall = true;
		this.drawRightWall = true;
		this.drawBottomWall = true;
		this.drawLeftWall = true;
	}

	/**
	 * Draw the cell
	 */
	draw() {
		const left = this.colIdx * Cell.cellSize;
		const right = (this.colIdx + 1) * Cell.cellSize;
		const top = this.rowIdx * Cell.cellSize;
		const bottom = (this.rowIdx + 1) * Cell.cellSize;

		stroke(255);

		if (this.drawTopWall) {
			line(left, top, right, top);
		}

		if (this.drawRightWall) {
			line(right, top, right, bottom);
		}

		if (this.drawBottomWall) {
			line(right, bottom, left, bottom);
		}

		if (this.drawLeftWall) {
			line(left, bottom, left, top);
		}

		// noFill();
		// rect(x, y, Cell.cellSize, Cell.cellSize);
	}
}
