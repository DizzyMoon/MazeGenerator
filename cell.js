export class Cell {
        constructor(row, col, north = true, east = true, west = true, south = true, isCurrentCell = false, isNextCell = false, isStart = false, isGoal = false){
            this.row = row;
            this.col = col;
            this.north = north;
            this.east = east;
            this.west = west;
            this.south = south;
            this.isCurrentCell = isCurrentCell;
            this.isNextCell = isNextCell;
            this.isStart = isStart;
            this.isGoal = isGoal;
        }
}
