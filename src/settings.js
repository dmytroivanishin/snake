const width = 600;

const board = {
    width,
    height: 60,
    font: "normal 25px Arial, sans-serif",
    textScore: {
        x: 60,
        y: 19
    },
    textLevel: {
        x: 500,
        y: 19
    },
    apple: {
        x: 15,
        y: 15
    }
};

const height = width + board.height;

const popup = {
    width: 200,
    height: 100,
    font: "normal 25px Arial, sans-serif"
};

const ceil = 30;

const row = width / ceil;

const colors = {
    snakeBody: "#1fb9dd",
    snakeHead: "#00ffff",
    apple: "#d86464",
    wall: "#425870",
    text: "#000000",
    popup: "#e0cd1e"
};

const amountLevels = 4;

export { width, height, board, popup, ceil, row, colors, amountLevels };