import Game from "./game";
import Sounds from "./sounds";
import Snake from "./snake";
import Food from "./food";

import store from "./store";

import "./index.scss";

const sounds = new Sounds();
sounds
    .add("eat", ["sounds/eat.mp3", "sounds/eat.ogg"])
    .add("nextLevel", ["sounds/next_level.mp3", "sounds/next_level.ogg"])
    .add("gameOver", ["sounds/game_over.mp3", "sounds/game_over.ogg"])
    .add("win", ["sounds/win.mp3", "sounds/win.ogg"]);

const snake = new Snake(store);
const food = new Food(store);

const game = new Game({
    canvas: document.getElementById("canvas"),
    store,
    sounds,
    snake,
    food
});

game.init();