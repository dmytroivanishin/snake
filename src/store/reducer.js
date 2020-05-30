import * as maps from "../maps";

const moveSnake = (tail, newMovementSnake) => {
    const restSnake = tail.slice(1, tail.length - 1);

    const lastHead = { ...tail[tail.length - 1] }
    lastHead.h = false;

    return [
        ...restSnake,
        lastHead,
        newMovementSnake
    ];
};

const initialState = {
    snake: {
        tail: [
            {x: 1, y: 1, d: "right", h: false},
            {x: 2, y: 1, d: "right", h: false},
            {x: 3, y: 1, d: "right", h: false},
            {x: 4, y: 1, d: "right", h: true}
        ],
        speed: 300,
        lastPosTail: {},
        direction: "right"
    },
    food: {
        didAte: true,
        apples: {}
    },
    score: 0,
    maps: maps,
    level: 1,
    nextLevel: false,
    win: false,
    gameStart: false,
    gameOver: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "GAME_START":
            return {
                ...state,
                gameStart: true,
                nextLevel: false
            }
        case "CHANGE_DIRECTION":
            return {
                ...state,
                snake: {
                    ...state.snake,
                    direction: action.payload
                }
            }
        case "MOVE":
            return {
                ...state,
                snake: {
                    ...state.snake,
                    tail: [ ...moveSnake(state.snake.tail, action.payload) ],
                    lastPosTail: state.snake.tail[0]
                }
            }
        case "ADD_FOOD":
            return {
                ...state,
                snake: {
                    ...state.snake
                },
                food: {
                    didAte: false,
                    apples: action.payload
                }
            }
        case "GROWTH":
            return {
                ...state,
                snake: {
                    ...state.snake,
                    tail: [ state.snake.lastPosTail, ...state.snake.tail ],
                    speed: state.snake.speed - 0.5
                },
                food: {
                    didAte: true,
                    apples: {}
                },
                score: state.score + 1
            }
        case "NEXT_LEVEL":
            return {
                ...initialState,
                snake: {
                    ...initialState.snake,
                    
                },
                nextLevel: true,
                level: state.level + 1,
                
            }
        case "WIN":
            return {
                ...state,
                gameOver: false,
                nextLevel: false,
                win: true
            }
        case "GAME_OVER":
            return {
                ...state,
                gameStart: false,
                nextLevel: false,
                gameOver: true,
                win: false
            }
        default: 
            return state;
    }
};

export default reducer;