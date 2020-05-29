let width, height, board, popup, ceil, row, colors, levelsAmount;

width = 600;

board = {
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

height = width + board.height;

popup = {
    width: 200,
    height: 100,
    font: "normal 25px Arial, sans-serif"
};

ceil = 30;
row = width / ceil;

colors = {
    snakeBody: "#1fb9dd",
    snakeHead: "#00ffff",
    apple: "#d86464",
    wall: "#425870",
    text: "#000000",
    popup: "#e0cd1e"
};

levelsAmount = 5;

export { width, height, board, popup, ceil, row, colors, levelsAmount };