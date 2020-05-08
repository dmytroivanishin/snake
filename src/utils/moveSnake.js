const mapCode = (keyCode) => {
    let direction = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    return direction[keyCode];
}

const setDirection = (keyCode, head) => {
    const direction = mapCode(keyCode);
    
    if(direction === "left" && head.d !== "right"){
        return { x: head.x - 1, y: head.y, d: direction, h: true };
    }
    if(direction === "right" && head.d !== "left"){
        return { x: head.x + 1, y: head.y, d: direction, h: true };
    }
    if(direction === "up" && head.d !== "down"){
        return { x: head.x, y: head.y + 1, d: direction, h: true };
    }
    if(direction === "down" && head.d !== "up"){
        return { x: head.x, y: head.y - 1, d: direction, h: true };
    }

    return false;
};

export default (keyCode, snake) => {
    const lastHeadSnake = snake[snake.length - 1];
    let newMovementSnake;

    newMovementSnake = setDirection(keyCode, lastHeadSnake);

    if(!newMovementSnake){
        return false;
    }

    lastHeadSnake.h = false
    snake.shift();
    snake.push(newMovementSnake);
};



