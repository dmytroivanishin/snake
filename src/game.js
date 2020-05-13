import { animateRAFInterval } from "./utils";

export default class Game {
    constructor({ state, canvas, snake, food }) {
        this.state = state;
        this.canvas = canvas;
        this.snake = snake;
        this.food = food;

        this.ctx;
    }

    init() {
        window.addEventListener("load", this._onload);
    }

    _onload = () => {
        this.canvas.width = 600;
        this.canvas.height = 660;

        
        this.ctx = this.canvas.getContext("2d");

        this.food.addNewFood();
        this._renderGame();

        document.addEventListener("keydown", this._onkeydown);
    }

    _onkeydown = (e) => {
        animateRAFInterval.cancel();

        this.snake.checkNextLevel();
        this.snake.checkWin();
        this.snake.changeDirection(e.keyCode);
        this.food.addNewFood();

        this._renderGame();

        animateRAFInterval.start(() => {

            this.snake.checkNextLevel();
            this.snake.checkWin();
            this.snake.moveSnake();
            this.food.addNewFood();

            this._renderGame();

        }, 100);
    }

    _renderGame() {
        this.ctx.clearRect(0, 0, 600, 660);

        this._renderScore();

        for(let y = 0; y < 20; y+=1) {
            for(let x = 0; x < 20; x+=1) {

                this._renderSnake(this.state.snake, x, y);
                this._renderMap(this.state.maps[`map${this.state.level}`], x, y);
                this._renderFood(this.state.food, x, y);  

            }
        }
    };

    _renderScore() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, 600, 60);

        this.ctx.fillStyle = "black";
        this.ctx.font = "normal 30px Arial, sans-serif";
        this.ctx.fillText(this.state.score, 60, 60 / 2 + 30 / 3);

        this.ctx.fillStyle = "red";
        this.ctx.fillRect(15, 60 / 2 - 30 / 2, 30, 30);
    }

    _renderSnake(snake, x, y) {
        for(let s = 0; s < snake.tail.length; s+=1) {
            if(x === snake.tail[s].x && y === snake.tail[s].y) {
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(x*30, y*30 + 60, 30, 30);
                if(snake.tail[s].h){
                    this.ctx.fillStyle = "aqua";
                    this.ctx.fillRect(x*30, y*30 + 60, 30, 30);
                }
            }
        }
    }

    _renderFood(food, x, y) {
        if(x === food.apples.x && y === this.state.food.apples.y) {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(x*30, y*30 + 60, 30, 30);
        }
    }

    _renderMap(map, x, y) {
        for(let m = 0; m < map.cords.length; m+=1) {
            if(map.cords[m].x === x && map.cords[m].y === y) {
                this.ctx.fillStyle = "brown";
                this.ctx.fillRect(x*30, y*30 + 60, 30, 30);
            }
        }
    }
};