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

const hasDirection = (snake, direction) => {
    const headSnake = getHeadSnake(snake);

    if(direction === headSnake.d){
        return false;
    }

    return true;
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

export const moveSnake = (snake) => {
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



export const changeDirection = (keyCode, snake) => {
    const direction = mapCode(keyCode);
    const lastDirection = snake.direction;

    if(!hasDirection(snake, direction)){
        return false;
    }

    if(hasSetDirection(snake, direction)) {
        snake.direction = direction;
    }
    else{
        return false;
    }

    moveSnake(snake);

};

