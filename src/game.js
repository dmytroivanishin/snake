import { gameStart } from './store/action';
import { animateRAFInterval } from "./utils";
import { width, height, board, popup, ceil, row, colors } from "./settings";

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
        this.canvas.width = width;
        this.canvas.height = height;
        
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
        this.ctx.clearRect(0, 0, width, height);

        const { snake, food, maps, level, score, gameStart, win, gameOver } = state;

        this._renderScoreboard(score, level);

        for(let y = 0; y < row; y+=1) {
            for(let x = 0; x < row; x+=1) {

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
        this.ctx.fillStyle = colors.popup;
        this.ctx.fillRect(0, 0, board.width, board.height);

        this.ctx.fillStyle = colors.text;
        this.ctx.font = board.font;
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(score, board.textScore.x, board.textScore.y);

        this.ctx.fillStyle = colors.apple;
        this.ctx.fillRect(board.apple.x, board.apple.y, ceil, ceil);

        this.ctx.fillStyle = colors.text;
        this.ctx.textAlign = "left";
        this.ctx.font = board.font;
        this.ctx.fillText(`Level: ${level}`, board.textLevel.x, board.textLevel.y);
    }

    _renderPopup(text) {
        const halfW = (width / 2),
              halfH = (height / 2),
              x = halfW - (popup.width / 2),
              y = halfH - (popup.height / 2);       

        this.ctx.fillStyle = colors.popup;
        this.ctx.fillRect(x, y, popup.width, popup.height);

        this.ctx.fillStyle = colors.text;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = popup.font;
        this.ctx.fillText(text, halfW, halfH);
    }

    _renderSnake(snake, x, y) {
        for(let s = 0; s < snake.tail.length; s+=1) {
            if(x === snake.tail[s].x && y === snake.tail[s].y) {
                this.ctx.fillStyle = colors.snakeBody;
                this.ctx.fillRect(x*ceil, y*ceil + board.height, ceil, ceil);
                if(snake.tail[s].h){
                    this.ctx.fillStyle = colors.snakeHead;
                    this.ctx.fillRect(x*ceil, y*ceil + board.height, ceil, ceil);
                }
            }
        }
    }

    _renderFood(food, x, y) {
        if(x === food.apples.x && y === food.apples.y) {
            this.ctx.fillStyle = colors.apple;
            this.ctx.fillRect(x*ceil, y*ceil + board.height, ceil, ceil);
        }
    }

    _renderMap(map, x, y) {
        for(let m = 0; m < map.cords.length; m+=1) {
            if(map.cords[m].x === x && map.cords[m].y === y) {
                this.ctx.fillStyle = colors.wall;
                this.ctx.fillRect(x*ceil, y*ceil + board.height, ceil, ceil);
            }
        }
    }
};