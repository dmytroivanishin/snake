import Game from "./game";
import Sounds from "./sounds";
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

const sounds = new Sounds();

sounds.add("eat", ["sounds/eat.mp3", "sounds/eat.ogg"]);
sounds.add("nextLevel", ["sounds/next_level.mp3", "sounds/next_level.ogg"]);
sounds.add("gameOver", ["sounds/game_over.mp3", "sounds/game_over.ogg"]);
sounds.add("win", ["sounds/win.mp3", "sounds/win.ogg"]);

const snake = new Snake(store);
const food = new Food(store);

const game = new Game({
    store,
    sounds,
    canvas: document.getElementById("game-field"),
    snake,
    food
});

game.init();