class Cell {
	/**
	 * All the cells
	 * @type {Cell[]}
	 */
	static Cells = [];
	static size = 40;

	rowIdx;
	colIdx;

	visited = false;
	highlighted = false;

	drawTopWall = true;
	drawRightWall = true;
	drawBottomWall = true;
	drawLeftWall = true;

	/**
	 * Create a new cell, and push it to the Cell.Cells array
	 * @param {number} rowIdx The index of the row (0 being top)
	 * @param {number} colIdx The index of the col (0 being left)
	 */
	constructor(rowIdx, colIdx) {
		this.rowIdx = rowIdx;
		this.colIdx = colIdx;

		Cell.Cells.push(this);
	}

	/**
	 * Draw the cell
	 */
	draw() {
		const top = this.rowIdx * Cell.size;
		const left = this.colIdx * Cell.size;
		const bottom = (this.rowIdx + 1) * Cell.size;
		const right = (this.colIdx + 1) * Cell.size;

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

		if (this.visited) {
			noStroke();

			if (this.highlighted) {
				fill(0, 255, 0, 100);
			} else {
				fill(255, 0, 255, 100);
			}
			rect(left, top, Cell.size, Cell.size);
		}
	}

	/**
	 * Get a random next neighbour that hasn't been visited
	 * Returns the next cell, and the number of other options
	 * Returns null if there are no unvisited neighbours
	 * @returns {{ cell: Cell, count: number} | null} Next cell that hasn't been visited and number of options, or null if none available
	 */
	getNextNeighbour() {
		const neighbours = [
			// top
			Cell.getCell(this.rowIdx - 1, this.colIdx),
			// right
			Cell.getCell(this.rowIdx, this.colIdx + 1),
			// bottom
			Cell.getCell(this.rowIdx + 1, this.colIdx),
			// left
			Cell.getCell(this.rowIdx, this.colIdx - 1)
		].filter(c => c?.visited === false);

		if (neighbours.length) {
			const idx = Math.floor(random(0, neighbours.length));
			return { cell: neighbours[idx], count: neighbours.length };
		}

		return null;
	}

	/**
	 * Get a cell at a certain row and column
	 * Returns null, if that cell doesn't exist
	 * @param {number} row
	 * @param {number} col
	 * @returns {Cell | null} The cell at the row and column, or null
	 */
	static getCell(row, col) {
		const colCount = Math.floor(width / Cell.size);
		const rowCount = Math.floor(height / Cell.size);

		if (row < 0 || row > rowCount - 1) return null;
		if (col < 0 || col > colCount - 1) return null;

		return Cell.Cells[col + row * colCount];
	}

	/**
	 * Remove the walls between two cells
	 * @param {Cell} current The current cell
	 * @param {Cell} next The cell being moved to
	 */
	static setWalls(current, next) {
		const dCol = current.colIdx - next.colIdx;

		// moving right
		if (dCol < 0) {
			current.drawRightWall = false;
			next.drawLeftWall = false;
			return;
		}

		// moving left
		if (dCol > 0) {
			current.drawLeftWall = false;
			next.drawRightWall = false;
			return;
		}

		const dRow = current.rowIdx - next.rowIdx;
		// moving down
		if (dRow < 0) {
			current.drawBottomWall = false;
			next.drawTopWall = false;
			return;
		}

		// moving down
		if (dRow > 0) {
			current.drawTopWall = false;
			next.drawBottomWall = false;
			return;
		}
	}
}
