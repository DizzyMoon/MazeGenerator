export class Cell {
        constructor(row, col, north = false, east = false, west = false, south = false){
            this.row = row;
            this.col = col;
            this.north = north;
            this.east = east;
            this.west = west;
            this.south = south;
        }
}
