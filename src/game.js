import { gameStart } from './store/action';
import { animateRAFInterval } from "./utils";

export default class Game {
    constructor({ canvas, store, sounds, snake, food }) {
        this.canvas = canvas;
        this.store = store;
        this.sounds = sounds;
        this.snake = snake;
        this.food = food;

        this.state;
        this.ctx;
    }

    init() {
        window.addEventListener("load", this._onload);

        this.store.subscribe(() => {
            this.state = this.store.getState();

            this._renderGame(this.state);            
        });
    }

    _onload = () => {
        this.canvas.width = 600;
        this.canvas.height = 660;
        
        this.ctx = this.canvas.getContext("2d");

        document.addEventListener("keydown", this._onkeydown);

        this.state = this.store.getState();
        this._renderGame(this.state);

        let rest				= 0,
            previosMillisecond	= 0,
            currentMillisecond	= 0;

        animateRAFInterval.start((time) => {
            rest = time % this.state.snake.speed;
            currentMillisecond = time - rest;

            if(previosMillisecond !== currentMillisecond && previosMillisecond < currentMillisecond){
                previosMillisecond = currentMillisecond;

                if(this.state.gameStart){

                    this.snake.checkNextLevel();
                    this.snake.checkWin();
                    this.food.addNewFood();
                    this.snake.moveSnake();

                    const { playlist } = this.sounds;
                    const { eat, nextLevel, gameOver, win } = playlist;

                    if(this.state.food.didAte){
                        eat.play();
                    }
                    
                    if(this.state.nextLevel){
                        nextLevel.play();
                    }
                    if(this.state.win){
                        animateRAFInterval.cancel();
                        document.removeEventListener("keydown", this._onkeydown);
                        win.play();
                    }
                    if(this.state.gameOver){
                        animateRAFInterval.cancel();
                        document.removeEventListener("keydown", this._onkeydown);
                        gameOver.play();
                    }
                }
            }
        });
    }

    _onkeydown = (e) => {
        if(!this.state.gameStart){
            this.store.dispatch(gameStart());
        }

        this.snake.changeDirection(e.keyCode);
    }

    _renderGame(state) {
        this.ctx.clearRect(0, 0, 600, 660);

        const { snake, food, maps, level, score, gameStart, win, gameOver } = state;

        this._renderScoreboard(score, level);

        for(let y = 0; y < 20; y+=1) {
            for(let x = 0; x < 20; x+=1) {

                this._renderSnake(snake, x, y);
                this._renderMap(maps[`map${level}`], x, y);
                this._renderFood(food, x, y);  

            }
        }

        if(!gameStart){
            this._renderPopup("Press any key");
        }

        if(win){
            this._renderPopup("You win");
        }
        if(gameOver){
            this._renderPopup("Game Over");
        }
    };

    _renderScoreboard(score, level) {
        this.ctx.fillStyle = "#E0CD1E";
        this.ctx.fillRect(0, 0, 600, 60);

        this.ctx.fillStyle = "black";
        this.ctx.font = "normal 25px Arial, sans-serif";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(score, 60, 19);

        this.ctx.fillStyle = "#D86464";
        this.ctx.fillRect(15, 15, 30, 30);

        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "left";
        this.ctx.font = "normal 25px Arial, sans-serif";
        this.ctx.fillText(`Level: ${level}`, 500, 19);
    }

    _renderPopup(text) {
        this.ctx.fillStyle = "#E0CD1E";
        this.ctx.fillRect(600 / 2 - 100, 660 / 2 - 50, 200, 100);

        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "normal 25px Arial, sans-serif";
        this.ctx.fillText(text, 600 / 2, 660 / 2);
    }

    _renderSnake(snake, x, y) {
        for(let s = 0; s < snake.tail.length; s+=1) {
            if(x === snake.tail[s].x && y === snake.tail[s].y) {
                this.ctx.fillStyle = "#1FB9DD";
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
            this.ctx.fillStyle = "#D86464";
            this.ctx.fillRect(x*30, y*30 + 60, 30, 30);
        }
    }

    _renderMap(map, x, y) {
        for(let m = 0; m < map.cords.length; m+=1) {
            if(map.cords[m].x === x && map.cords[m].y === y) {
                this.ctx.fillStyle = "#425870";
                this.ctx.fillRect(x*30, y*30 + 60, 30, 30);
            }
        }
    }
};