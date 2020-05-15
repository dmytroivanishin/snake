import { animateRAFInterval } from "./utils";

export default class Game {
    constructor({ store, canvas, snake, food }) {
        this.store = store;
        this.canvas = canvas;
        this.snake = snake;
        this.food = food;

        this.ctx;
    }

    init() {
        window.addEventListener("load", this._onload);
        
        this.store.subscribe(() => {
            const state = this.store.getState();

            if(state.nextLevel){
                animateRAFInterval.cancel();
            }
            if(state.win){
                animateRAFInterval.cancel();
            }
            if(state.gameOver){
                animateRAFInterval.cancel();
            }
            
            this._renderGame();
        })
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

        animateRAFInterval.start(() => {
            
            this.snake.checkNextLevel();
            this.snake.checkWin();
            this.snake.moveSnake()
            this.food.addNewFood();
            
        }, 500);
        
    }

    _renderGame() {
        this.ctx.clearRect(0, 0, 600, 660);

        const { snake, food, maps, level, score } = this.store.getState();

        this._renderScore(score);

        for(let y = 0; y < 20; y+=1) {
            for(let x = 0; x < 20; x+=1) {

                this._renderSnake(snake, x, y);
                this._renderMap(maps[`map${level}`], x, y);
                this._renderFood(food, x, y);  

            }
        }
    };

    _renderScore(score) {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, 600, 60);

        this.ctx.fillStyle = "black";
        this.ctx.font = "normal 30px Arial, sans-serif";
        this.ctx.fillText(score, 60, 60 / 2 + 30 / 3);

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
        if(x === food.apples.x && y === food.apples.y) {
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