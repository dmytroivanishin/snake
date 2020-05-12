import { animateRAFInterval } from "./utils";
import Snake from "./snake";
import Food from "./food";

const settings = {
    sizeGrid: 600,
    sizeRow: 20,
    sizeCeil: 30,
    width: 600,
    height: 660,
    scoreBoard: 60
};

const state = {
    snake: {
        tail: [
            {x: 2, y: 2, d: "right", h: false},
            {x: 3, y: 2, d: "right", h: false},
            {x: 4, y: 2, d: "right", h: false},
            {x: 5, y: 2, d: "right", h: false},
            {x: 6, y: 2, d: "right", h: false},
            {x: 7, y: 2, d: "right", h: false},
            {x: 8, y: 2, d: "right", h: true}
        ],
        lastPosTail: {},
        direction: "right"
    },
    food: {
        didAte: true,
        apples: {}
    },
    score: 0,
    gameOver: false
};

const snake = new Snake(state);
const food = new Food(state);

window.addEventListener("load", () => {

    const canvas = document.getElementById("game-field");
    const ctx = canvas.getContext("2d");

    canvas.width = settings.width;
    canvas.height = settings.height;

    const _renderScore = () => {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, settings.width, settings.scoreBoard);

        ctx.fillStyle = "black";
        ctx.font = "normal 30px Arial, sans-serif";
        ctx.fillText(state.score, 60, settings.scoreBoard / 2 + 30 / 3);

        ctx.fillStyle = "red";
        ctx.fillRect(15, settings.scoreBoard / 2 - 30 / 2, 30, 30);
    };

    const _renderSnake = (snake, x, y) => {
        for(let s = 0; s < snake.tail.length; s+=1) {
            if(x === snake.tail[s].x && y === snake.tail[s].y) {
                ctx.fillStyle = "blue";
                ctx.fillRect(x*settings.sizeCeil, y*settings.sizeCeil + settings.scoreBoard, settings.sizeCeil, settings.sizeCeil);
                if(snake.tail[s].h){
                    ctx.fillStyle = "aqua";
                    ctx.fillRect(x*settings.sizeCeil, y*settings.sizeCeil + settings.scoreBoard, settings.sizeCeil, settings.sizeCeil);
                }
            }
        }
    };

    const _renderFood = (food, x, y) => {
        if(x === food.apples.x && y === state.food.apples.y) {
            ctx.fillStyle = "red";
            ctx.fillRect(x*settings.sizeCeil, y*settings.sizeCeil + settings.scoreBoard, settings.sizeCeil, settings.sizeCeil);
        }
    };

    const renderGame = () => {
        ctx.clearRect(0, 0, settings.width, settings.height);

        _renderScore();

        for(let y = 0; y < settings.sizeRow; y+=1) {
            for(let x = 0; x < settings.sizeRow; x+=1) {

                _renderSnake(state.snake, x, y);
                _renderFood(state.food, x, y);   

            }
        }
    };

    food.addNewFood();
    renderGame();

    document.addEventListener("keydown", (e) => {

        animateRAFInterval.cancel();

        snake.changeDirection(e.keyCode);
        snake.checkGrowth();
        food.addNewFood();
        
        renderGame();

        animateRAFInterval.start(() => {

            snake.moveSnake();
            snake.checkGrowth();
            food.addNewFood();

            renderGame();

        }, 500);
    });

});


