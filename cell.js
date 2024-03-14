export class Cell {
        constructor(row, col, northWall = true, eastWall = true, westWall = true, southWall = true){
            this.row = row;
            this.col = col;
            this.northWall = northWall;
            this.eastWall = eastWall;
            this.westWall = westWall;
            this.southWall = southWall;
        }
}
