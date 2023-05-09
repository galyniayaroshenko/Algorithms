class QueensСombinations { // Реалізація вирішення проблеми про N ферзів
  constructor(dimension) {
    this._dimension = dimension;

    this._columns = new Array(this._dimension).fill(0);
    this._diagonalsCount = 2 * this._dimension - 1;
    this._leftDiagonals = new Array(this._diagonalsCount);
    this._rightDiagonals = new Array(this._diagonalsCount);
  }

  run(startCol, incrementer) {
    const matrix = Array(this._dimension).fill(0);

    let solutionsCount = 0;
    let row = 1;
    let col = 0;

    this._set(0, startCol, true);

    while (row >= 1) {
      let dimension = this._dimension;

      if (col === dimension) {
        row--;
        if (row >= 1) {
          col = matrix[row];
          this._set(row, col, false);
          col++;
        }
        continue;
      }

      if (row === this._dimension) {
        solutionsCount += incrementer;
        col = this._dimension;
        continue;
      }

      if (this._check(row, col)) {
        this._set(row, col, true);
        matrix[row] = col;
        row++;
        col = 0;
      } else {
        col++;
      }
    }

    return solutionsCount;
  }

  /* private methods */
  _check(row, col) {
    const leftDiagIndex = col + row;
    const rightDiagIndex = this._dimension - 1 - col + row;

    return !this._columns[col] && !this._leftDiagonals[leftDiagIndex] && !this._rightDiagonals[rightDiagIndex];
  }

  _set(row, col, value) {
    const leftDiagIndex = col + row;
    const rightDiagIndex = this._dimension - 1 - col + row;

    this._columns[col] = this._leftDiagonals[leftDiagIndex] = this._rightDiagonals[rightDiagIndex] = value;
  }
}

addEventListener('message', event => {
  const queensСombinations = new QueensСombinations(event.data.dimension);

  postMessage(queensСombinations.run(event.data.col, event.data.incrementer));
});
