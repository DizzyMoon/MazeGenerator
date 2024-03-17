"use strict";

import { Cell } from "./cell.js";
import { MazeObject } from "./maze-object.js";

//window.addEventListener("DOMContentLoaded", start);

const generateButton = document.getElementById('generate-new')
const loadingContainer = document.getElementById('loading-container')

generateButton.addEventListener('click', start)

let currentLoadTime = 0;

function start() {
  console.log("Javascript is running :)");
  let size = 10;
  console.log("New Maze: ");
  let maze = generateMaze(size);
  console.table(`Final maze: `);
  console.log(maze);
  console.log(JSON.stringify(maze));
}

function updateMaze(size, maze) {/*
  const startX = Math.floor(Math.random() * size);
  const startY = Math.floor(Math.random() * size);
  
  const startPos = {
    "X": startX,
    "Y": startY
  }

  let goalX = startX;
  let goalY = startY;
  
  let goalPos = startPos;
  while (goalPos === startPos){
    goalX = Math.floor(Math.random() * size);
    goalY = Math.floor(Math.random() * size);

    goalPos = {
      "X": goalX,
      "Y": goalY
    }
  
  }
  */

  const startX = 0;
  const startY = 0;

  const goalX = size - 1;
  const goalY = size - 1;

  let start = maze[startX][startY];

  console.log("Start position: " + JSON.stringify(start));

  let goal = maze[goalX][goalY];

  console.log("Goal position: " + JSON.stringify(goal));

  return new MazeObject(size, size, start, goal, maze);
}

function generateMaze(size) {
  let mazeCells = initializeMaze(size);
  let mazeObject = updateMaze(size, mazeCells);
  let mazeWithPath = createStartPath(mazeObject);
  console.log(size, size);

  return mazeWithPath;
}

function createStartPath(maze) {
  let newMaze = maze.maze;
  let mazeWithPath = maze;
  let start = maze.start;
  let goal = maze.goal;
  let currentCell = start;
  let nextCell = null;
  let visited = new Set();
  const numberOfCells = maze.cols * maze.rows;
  const removeWall = (direction) => {
    let currentX;
    let currentY;

    let nextX;
    let nextY;

    switch (direction) {
      case "west":
        currentX = currentCell.row;
        currentY = currentCell.col;

        nextX = nextCell.row;
        nextY = nextCell.col;

        newMaze[currentX][currentY].west = false;

        newMaze[nextX][nextY].east = false;
      
        break;
      case "east":
        currentX = currentCell.row;
        currentY = currentCell.col;

        nextX = nextCell.row;
        nextY = nextCell.col;

        newMaze[currentX][currentY].east = false;
        newMaze[nextX][nextY].west = false;

        break;
      case "south":
        currentX = currentCell.row;
        currentY = currentCell.col;

        nextX = nextCell.row;
        nextY = nextCell.col;

        newMaze[currentX][currentY].south = false;
        newMaze[nextX][nextY].north = false;
        break;
      case "north":
        currentX = currentCell.row;
        currentY = currentCell.col;

        nextX = nextCell.row;
        nextY = nextCell.col;
      
        newMaze[currentX][currentY].north = false;
        newMaze[nextX][nextY].south = false;
        break;
    }
  };

  const pickRandomNeighbor = () => {
    let newCell = Object.assign({}, currentCell);
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
  };

  console.log(maze);

  console.log("visited size: " + visited.size);

  console.log("Number of cells: " + numberOfCells);

  while (visited.size < numberOfCells) {
    nextCell = pickRandomNeighbor();

    loadingContainer.innerHTML = (visited.size / numberOfCells) * 100 + '%';

    if (
      nextCell.col >= 0 &&
      nextCell.col <= maze.cols - 1 &&
      nextCell.row >= 0 &&
      nextCell.row <= maze.rows - 1
    ) {
      newMaze[currentCell.row][currentCell.col].isCurrentCell = true;
      newMaze[nextCell.row][nextCell.col].isNextCell = true;

      newMaze[start.col][start.row].isStart = true;
      newMaze[goal.col][goal.row].isGoal = true;

      console.log("Current Cell: " + currentCell.col + ", " + currentCell.row);

      console.log("Next Cell: " + nextCell.col + ", " + nextCell.row);

      const cellKey = (cell) => `${cell.col},${cell.row}`;

      const nextCellKey = cellKey(nextCell);

      if (!visited.has(nextCellKey)) {
        if (nextCell.col > currentCell.col) {
          console.log("Going east");
          removeWall("east");
          visited.add(nextCellKey);
        }

        if (nextCell.col < currentCell.col) {
          console.log("Going west");
          removeWall("west");
          visited.add(nextCellKey);
        }

        if (nextCell.row < currentCell.row) {
          console.log("Going north");
          removeWall("north");
          visited.add(nextCellKey);
        }
        if (nextCell.row > currentCell.row) {
          console.log("Going south");
          removeWall("south");
          visited.add(nextCellKey);
        }
      }
      mazeWithPath.maze = newMaze;

      drawMaze(mazeWithPath);

      currentLoadTime = visited.size;
      

      newMaze[currentCell.row][currentCell.col].isCurrentCell = false;
      newMaze[nextCell.row][nextCell.col].isNextCell = false;
      newMaze[nextCell.row][nextCell.col].isCurrentCell = true;
      currentCell = nextCell;
      console.log("Amount of cells currently visited: " + visited.size);
    }
  }

  loadingContainer.innerHTML = "100%"

  return mazeWithPath;
}

function initializeMaze(size) {
  let maze = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(new Cell(i, j)); // Swap i and j here
    }
    maze.push(row);
  }
  return maze;
}

function drawMaze(maze) {
  const mazeContainer = document.getElementById("maze-container");
  mazeContainer.innerHTML = "";

  const colSize = maze.cols;
  const rowSize = maze.rows;

  for (let i = 0; i < rowSize; i++) {
    const row = document.createElement("row");
    row.classList.add("row");
    mazeContainer.appendChild(row);

    for (let j = 0; j < colSize; j++) {
      const cell = document.createElement("cell");
      cell.classList.add("cell");

      if (maze.maze[i][j].isStart) {
        cell.classList.add("start");
      }

      if (maze.maze[i][j].isGoal) {
        cell.classList.add("goal");
      }

      if (maze.maze[i][j].isCurrentCell) {
        cell.classList.add("here");
      }

      if (maze.maze[i][j].isNextCell) {
        cell.classList.add("next-cell");
      }

      if (maze.maze[i][j].north) {
        cell.classList.add("up");
      }

      if (maze.maze[i][j].south) {
        cell.classList.add("down");
      }

      if (maze.maze[i][j].east) {
        cell.classList.add("right");
      }

      if (maze.maze[i][j].west) {
        cell.classList.add("left");
      }

      row.appendChild(cell);
    }
  }
}
