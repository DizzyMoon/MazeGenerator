export class Cell {
        constructor(row, col, northWall = true, eastWall = true, westWall = true, southWall = true, isCurrentCell = false, isNextCell = false){
            this.row = row;
            this.col = col;
            this.northWall = northWall;
            this.eastWall = eastWall;
            this.westWall = westWall;
            this.southWall = southWall;
            this.isCurrentCell = isCurrentCell;
            this.isNextCell = isNextCell;
        }
}
