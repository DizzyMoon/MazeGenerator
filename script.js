"use strict";

import { Cell } from "./cell.js";
import { MazeObject } from "./maze-object.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Javascript is running :)");
  let size = 5;
  console.log(generateMaze(size));
}

function updateMaze(size, maze) {

  const startX = Math.floor(Math.random() * size)
  const startY = Math.floor(Math.random() * size)

  const goalX = Math.floor(Math.random() * size)
  const goalY = Math.floor(Math.random() * size)

  let start = maze[startX][startY]
  let goal = maze[goalX][goalY]

  return new MazeObject(size, size, start, goal, maze);
}

function generateMaze(size) {
  let mazeCells = initializeMaze(size);
  let mazeObject = updateMaze(size, mazeCells);
  let mazeWithPath = createStartPath(mazeObject);

  return mazeWithPath;

}

function createStartPath(maze){

  let newMaze = maze.maze;
  let currentCell = maze.start;
  let visited = [];

  while (currentCell !== maze.goal){
    decideDirection()
    console.log("Current cell: " + currentCell)
  }

  return newMaze;

  

  function decideDirection() {
    switch (Math.floor(Math.random() * 4 + 1)){
      case 1:
        console.log("Going east")
        goEast() 
        break;
      case 2:
        console.log("Going west")
        goWest()
        break;
      case 3:
        console.log("Going north")
        goNorth()
        break;
      case 4:
        console.log("Going south")
        goSouth()
        break;
    }
  }

  


  function goEast() {
    let nextCell = currentCell;
    nextCell.col++;
    if (maze.maze.includes(nextCell) && !visited.inculdes(nextCell)){
      //Change variable value
      currentCell.eastWall = false;
      //Copy replace actual cell with variable
      newMaze[currentCell.col][currentCell.row] = currentCell;
      currentCell.col++;
      visited.push(currentCell);
    }
  }

  function goWest() {
    let nextCell = currentCell;
    nextCell.col--;
    if (maze.maze.includes(nextCell) && !visited.inculdes(nextCell)){
      currentCell.westWall = false;
      newMaze[currentCell.col][currentCell.row] = currentCell;
      currentCell.col--;
      visited.push(currentCell);
    }
  }

  function goNorth() {
    let nextCell = currentCell;
    nextCell.row++;
    if (maze.maze.includes(nextCell) && !visited.inculdes(nextCell)){
      currentCell.northWall = false;
      newMaze[currentCell.col][currentCell.row] = currentCell;
      currentCell.row++;
      visited.push(currentCell);
    }
  }

  function goSouth() {
    let nextCell = currentCell;
    nextCell.row--;
    if (maze.maze.includes(nextCell) && !visited.inculdes(nextCell)){
      currentCell.southWall = false;
      newMaze[currentCell.col][currentCell.row] = currentCell;
      currentCell.row--;
      visited.push(currentCell);
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
