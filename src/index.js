import { animateRAFInterval } from "./utils";
import Game from "./game";
import Snake from "./snake";
import Food from "./food";
//import * as maps from "./maps";

import store from "./store";

//console.log(maps);

const settings = {
    width: 600,
    height: 660,
    sizeGrid: 600,
    sizeRow: 20,
    sizeCeil: 30,
    scoreBoard: 60
};

// const state = {
//     snake: {
//         tail: [
//             {x: 1, y: 1, d: "right", h: false},
//             {x: 2, y: 1, d: "right", h: false},
//             {x: 3, y: 1, d: "right", h: false},
//             {x: 4, y: 1, d: "right", h: true}
//         ],
//         lastPosTail: {},
//         direction: "right"
//     },
//     food: {
//         didAte: true,
//         apples: {}
//     },
//     score: 0,
//     maps: maps,
//     level: 3,
//     nextLevel: false,
//     win: false,
//     gameOver: false
// };

const snake = new Snake(store);
const food = new Food(store);
const game = new Game({
    store,
    canvas: document.getElementById("game-field"),
    snake,
    food
});

game.init();



// store.subscribe(() => {
//     const state = store.getState();
//     console.log(state.win);
//     if(state.gameOver){
//             animateRAFInterval.cancel();
//             //document.removeEventListener("keydown", this._onkeydown);
//     }
// })
    

// // console.log(state.maps[`map${state.level}`]);
// // console.log(state.level);
// // console.log(state.score);

// window.addEventListener("load", () => {

//     const canvas = document.getElementById("game-field");
//     const ctx = canvas.getContext("2d");

//     canvas.width = settings.width;
//     canvas.height = settings.height;

//     const _renderScore = () => {
//         ctx.fillStyle = "green";
//         ctx.fillRect(0, 0, settings.width, settings.scoreBoard);

//         ctx.fillStyle = "black";
//         ctx.font = "normal 30px Arial, sans-serif";
//         ctx.fillText(state.score, 60, settings.scoreBoard / 2 + 30 / 3);

//         ctx.fillStyle = "red";
//         ctx.fillRect(15, settings.scoreBoard / 2 - 30 / 2, 30, 30);
//     };

//     const _renderSnake = (snake, x, y) => {
//         for(let s = 0; s < snake.tail.length; s+=1) {
//             if(x === snake.tail[s].x && y === snake.tail[s].y) {
//                 ctx.fillStyle = "blue";
//                 ctx.fillRect(x*settings.sizeCeil, y*settings.sizeCeil + settings.scoreBoard, settings.sizeCeil, settings.sizeCeil);
//                 if(snake.tail[s].h){
//                     ctx.fillStyle = "aqua";
//                     ctx.fillRect(x*settings.sizeCeil, y*settings.sizeCeil + settings.scoreBoard, settings.sizeCeil, settings.sizeCeil);
//                 }
//             }
//         }
//     };

//     const _renderFood = (food, x, y) => {
//         if(x === food.apples.x && y === state.food.apples.y) {
//             ctx.fillStyle = "red";
//             ctx.fillRect(x*settings.sizeCeil, y*settings.sizeCeil + settings.scoreBoard, settings.sizeCeil, settings.sizeCeil);
//         }
//     };

//     const _renderMap = (map, x, y) => {
//         for(let m = 0; m < map.cords.length; m+=1) {
//             if(map.cords[m].x === x && map.cords[m].y === y) {
//                 ctx.fillStyle = "brown";
//                 ctx.fillRect(x*settings.sizeCeil, y*settings.sizeCeil + settings.scoreBoard, settings.sizeCeil, settings.sizeCeil);
//             }
//         }
//     }

//     const renderGame = () => {
//         ctx.clearRect(0, 0, settings.width, settings.height);

//         _renderScore();

//         for(let y = 0; y < settings.sizeRow; y+=1) {
//             for(let x = 0; x < settings.sizeRow; x+=1) {

//                 _renderSnake(state.snake, x, y);
//                 _renderMap(state.maps[`map${state.level}`], x, y);
//                 _renderFood(state.food, x, y);  

//             }
//         }
//     };

//     food.addNewFood();
//     renderGame();

//     document.addEventListener("keydown", (e) => {

//         animateRAFInterval.cancel();

//         snake.changeDirection(e.keyCode);
//         snake.checkNextLevel();
//         snake.checkWin();
//         //snake.checkGrowth();
//         food.addNewFood();
        
//         // console.log(state.maps[`map${state.level}`]);
//         // console.log(state.level);
//         // console.log(state.score);
//         // console.log(state.gameOver);
//         // console.log(state.win);

//         renderGame();

//         animateRAFInterval.start(() => {

//             snake.checkNextLevel();
//             snake.checkWin();
//             snake.moveSnake();
//             //snake.checkGrowth();
//             food.addNewFood();

//             // console.log(state.maps[`map${state.level}`]);
//             // console.log(state.level);
//             // console.log(state.score);

//             renderGame();

//         }, 100);
//     });

// });


