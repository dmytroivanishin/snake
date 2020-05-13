import { mapKeyCode } from './utils';

export default class Snake {
    constructor(state){
        this.state = state;
    }
    
    moveSnake() {
        const { snake } = this.state;
        const headSnake = this._getHeadSnake(snake);
        const direction = snake.direction;
        let newMovementSnake;
        let lastPosTail;

        if(direction === "left"){
            newMovementSnake =  { x: headSnake.x - 1, y: headSnake.y, d: direction, h: true };
        }
        if(direction === "right"){
            newMovementSnake =  { x: headSnake.x + 1, y: headSnake.y, d: direction, h: true };
        }
        if(direction === "up"){
            newMovementSnake =  { x: headSnake.x, y: headSnake.y - 1, d: direction, h: true };
        }
        if(direction === "down"){
            newMovementSnake =  { x: headSnake.x, y: headSnake.y + 1, d: direction, h: true };
        }
        
        if(!newMovementSnake){
            return false;
        }

        newMovementSnake = this._setTeleportSnake(newMovementSnake);

        if(this._getCollisionSnake(newMovementSnake)){
            this.state.gameOver = true;
            return false;
        }
    
        headSnake.h = false;
        lastPosTail = this.state.snake.tail.shift();

        this.state.snake.tail.push(newMovementSnake);
        this.state.snake.lastPosTail = lastPosTail;

        this._checkGrowth();
    }

    changeDirection(keyCode) {
        const { snake } = this.state;
        const direction = mapKeyCode(keyCode);
    
        if(this._hasDirection(snake, direction)) {
            this.state.snake.direction = direction;
        }
        else{
            return false;
        }
    
        this.moveSnake();
    };

    checkNextLevel() {
        const { score, maps, level } = this.state;
        const map = maps[`map${level}`];

        if(score >= map.completed && level < 4){
            this.state.level = level + 1;
        }
    }

    checkWin() {
        const { score, maps, level } = this.state;
        const map = maps[`map${level}`];

        if(score >= map.completed && level >= 4){
            this.state.win = true;
            this.state.gameOver = true;
        }
    }
    
    _checkGrowth() {
        const { snake } = this.state;
        const headSnake = this._getHeadSnake(snake);
        const { food: { apples }, score } = this.state;
    
        if(apples.x === headSnake.x && apples.y === headSnake.y){
            this.state.food.didAte = true;
            this.state.food.apples = {};
            this.state.snake.tail.unshift(this.state.snake.lastPosTail)
            this.state.score = score + 1;
        }
    }

    _getHeadSnake(snake) {
        return snake.tail[snake.tail.length - 1];
    }

    _hasDirection(snake, direction) {
        const headSnake = this._getHeadSnake(snake);
    
        if(direction === headSnake.d) {
            return false;
        }
    
        if(
            (direction === "left" && headSnake.d !== "right") ||
            (direction === "right" && headSnake.d !== "left") ||
            (direction === "up" && headSnake.d !== "down") ||
            (direction === "down" && headSnake.d !== "up")
        ) {
            return true;
        }
    
        return false;
    }

    _getCollisionSnake(headSnake) {
        const { maps, level } = this.state;
        const { tail } = this.state.snake;
        const map = maps[`map${level}`];
        
        for(let t = 0; t < tail.length; t+=1){
            if(tail[t].x === headSnake.x && tail[t].y === headSnake.y){
                return true;
            }
        }

        for(let m = 0; m < map.cords.length; m+=1) {
            for(let t = 0; t < tail.length; t+=1){
                if(headSnake.x === map.cords[m].x && headSnake.y === map.cords[m].y) {
                    return true;
                }
            }
        }
    }

    _setTeleportSnake(newHeadSnake) {
        const { direction } = this.state.snake;

        if(newHeadSnake.x > 19 && direction === "right"){
            return { x: 0, y: newHeadSnake.y, d: direction, h: true };
        }
        if(newHeadSnake.x < 0 && direction === "left"){
            return { x: 19, y: newHeadSnake.y, d: direction, h: true };
        }
        if(newHeadSnake.y < 0 && direction === "up"){
            return { x: newHeadSnake.x, y: 19, d: direction, h: true };
        }
        if(newHeadSnake.y > 19 && direction === "down"){
            return { x: newHeadSnake.x, y: 0, d: direction, h: true };
        }

        return { x: newHeadSnake.x, y: newHeadSnake.y, d: direction, h: true };
    }

};