import Game from "./game";
import Snake from "./snake";
import Food from "./food";

import store from "./store";

// const settings = {
//     width: 600,
//     height: 660,
//     sizeGrid: 600,
//     sizeRow: 20,
//     sizeCeil: 30,
//     scoreBoard: 60
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