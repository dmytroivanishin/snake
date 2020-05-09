const mapCode = (keyCode) => {
    let direction = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    return direction[keyCode];
}

const getHeadSnake = (snake) => {
    return snake.tail[snake.tail.length - 1];
};

const hasSetDirection = (snake, direction) => {
    const headSnake = getHeadSnake(snake);

    if(
        (direction === "left" && headSnake.d !== "right") ||
        (direction === "right" && headSnake.d !== "left") ||
        (direction === "up" && headSnake.d !== "down") ||
        (direction === "down" && headSnake.d !== "up")
    ){
        return true;
    }

    return false;
}

export const setDirection = (keyCode, snake) => {
    const direction = mapCode(keyCode);
    const lastDirection = snake.direction;

    if(hasSetDirection(snake, direction)) {
        snake.direction = direction;
    }
    else{
        snake.direction = lastDirection;
    }
};

export default (snake) => {
    const headSnake = getHeadSnake(snake);
    const direction = snake.direction;
    let newMovementSnake;

    if(direction === "left"){
        newMovementSnake =  { x: headSnake.x - 1, y: headSnake.y, d: direction, h: true };
    }
    if(direction === "right"){
        newMovementSnake =  { x: headSnake.x + 1, y: headSnake.y, d: direction, h: true };
    }
    if(direction === "up"){
        newMovementSnake =  { x: headSnake.x, y: headSnake.y + 1, d: direction, h: true };
    }
    if(direction === "down"){
        newMovementSnake =  { x: headSnake.x, y: headSnake.y - 1, d: direction, h: true };
    }

    if(!newMovementSnake){
        return false;
    }

    headSnake.h = false
    snake.tail.shift();
    snake.tail.push(newMovementSnake);
};



