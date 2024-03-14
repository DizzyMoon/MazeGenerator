"use strict";

import { Cell } from "./cell.js";
import { MazeObject } from "./maze-object.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Javascript is running :)");
  let size = 5;
  console.log("New Maze: ");
  console.log(generateMaze(size));
}

function updateMaze(size, maze) {

  const startX = Math.floor(Math.random() * size)
  const startY = Math.floor(Math.random() * size)

  const goalX = Math.floor(Math.random() * size)
  const goalY = Math.floor(Math.random() * size)

  let start = maze[startX][startY]

  console.log("Start position: " + JSON.stringify(start))
 


  let goal = maze[goalX][goalY]


  console.log("Goal position: " + JSON.stringify(goal))

  return new MazeObject(size, size, start, goal, maze);
}

function generateMaze(size) {
  let mazeCells = initializeMaze(size);
  let mazeObject = updateMaze(size, mazeCells);
  let mazeWithPath = createStartPath(mazeObject);
  console.log(size, size);

  return mazeWithPath;

}

function createStartPath(maze){
  let newMaze = maze.maze;
  let start = maze.start;
  let goal = maze.goal;
  let currentCell = start;
  let visited = [];

  const numberOfCells = maze.cols * maze.rows

  console.log("visited size: " + visited.length)

  console.log("Number of cells: " + numberOfCells)

  while (visited.length < numberOfCells) {

    console.log("Current Cell: " + currentCell)
    
    let nextCell = pickRandomNeighbor();

    console.log("nextCell.col: " + nextCell.col)
    console.log("newMaze.cols: " + newMaze.cols)
    if (nextCell.col >= 0 && nextCell.col <= maze.cols && nextCell.row >= 0 && nextCell.row <= maze.rows ) {
    if (!(visited.includes(nextCell))){
      if (nextCell.col > currentCell.col){
        console.log("Going east")
        removeWall("east");
        visited.push(nextCell)
      }

      if (nextCell.col < currentCell.col){
        console.log("Going west")
        removeWall("west");
        visited.push(nextCell)
      }

      if (nextCell.row > currentCell.row){
        console.log("Going north")
        removeWall("north")
        visited.push(nextCell)
      }
      if (nextCell.row < currentCell.row){
        console.log("Going south")
        removeWall("south");
        visited.push(nextCell)
      }
    }

    currentCell = nextCell;
    }
  }

  return newMaze;

  function removeWall(direction) {
    let x
    let y
    switch (direction) {
      case "east":
        x = currentCell.col;
        y = currentCell.row;
        newMaze[x][y].eastWall = false;
        newMaze[x + 1][y].westWall = false;
      case "west":
        x = currentCell.col;
        y = currentCell.row;
        newMaze[x][y].westWall = false;
        newMaze[x - 1][y].eastWall = false;
      case "north":
        x = currentCell.col;
        y = currentCell.row;
        newMaze[x][y].northWall = false;
        newMaze[x][y + 1].southWall = false;
      case "south":
        x = currentCell.col;
        y = currentCell.row;
        newMaze[x][y].southWall = false;
        newMaze[x][y - 1].northWall = false;
    }
  }

  function pickRandomNeighbor() {
    let newCell = Object.assign({}, currentCell)
    switch (Math.floor(Math.random() * 4 + 1)) {
      case 1:
        newCell.col = newCell.col + 1;
        return newCell;
      case 2:
        newCell.col = newCell.col - 1;
        return newCell;
      case 3:
        newCell.row = newCell.row + 1;
        return newCell;
      case 4:
        newCell.row = newCell.row - 1;
        return newCell;
    }
  }

}

function initializeMaze(size) {
  let maze = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(new Cell(j, i));
    }
    maze.push(row);
  }
  return maze;
}
