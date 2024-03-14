"use strict"

import Cell from "./cell"
import MazeObject from "./maze-object"


window.addEventListener("DOMContentLoaded", start)

function start() {
    console.log("Javascript is running :)")

    let size = 5
    newMaze = initializeMaze(size);
    let updatedMaze = generateMaze(size, newMaze)
    console.log(newMaze);
}

function generateMaze(size, maze) {
    let start = 0;
    let goal = 1;
    let newMaze = new MazeObject(size, size, start, goal, maze);
    return newMaze;
}

function initializeMaze(size) {
    let maze = [];
    for (let i = 0; i < size; i++){
        maze.push(new Cell(size, size));
    }

    return maze;
}