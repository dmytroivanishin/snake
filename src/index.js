import { animateRAFInterval } from "./utils";
import { moveSnake, changeDirection, checkGrowth } from "./snake";
//import getRandomPosition from "./food";
import { addNewFood } from "./food";

const state = {
    snake: {
        tail: [
            {x: 0, y: 0, d: "right", h: false},
            {x: 1, y: 0, d: "right", h: false},
            {x: 2, y: 0, d: "right", h: false},
            {x: 3, y: 0, d: "right", h: true}
        ],
        direction: "right"
    },
    food: {
        didAte: true,
        apples: {}
    }
};




window.addEventListener("load", () => {
    const canvas = document.getElementById("game-field");
    const ctx = canvas.getContext("2d");

    canvas.style.width = "600px";
    canvas.style.height = "600px";

    
    //console.log(state.food.apples);

    const renderGame = () => {
        ctx.clearRect(0, 0, 600, 600);
    
        //ctx.fillRect(0, 0, 30, 30)
    
        for(let y = 0; y < 20; y+=1){
            //console.log(i)
            for(let x = 0; x < 20; x+=1){
                //console.log(x*30, y*30)

                for(let s = 0; s < state.snake.tail.length; s+=1){
                    if(x === state.snake.tail[s].x && y === state.snake.tail[s].y){
                        ctx.fillStyle = "blue";
                        ctx.fillRect(x*30, y*30, 30, 30)
                    }
                }

                if(x === state.food.apples.x && y === state.food.apples.y){
                    ctx.fillStyle = "red";
                    ctx.fillRect(x*30, y*30, 30, 30)
                }
    
                
                
            }
        }
    };
    console.log({...state.food});
    addNewFood(state);

    renderGame();

    console.log({...state.food});

    document.addEventListener("keydown", (e) => {

        changeDirection(e.keyCode, state.snake);
        checkGrowth(state);
        addNewFood(state);
        //moveSnake(state.snake)

        console.log({...state.food});
        renderGame();
    });

    //addNewFood(state);
    

    // animateRAFInterval.start((time) => {

    //     //console.log(state.food.apples);
    //     moveSnake(state.snake);
    //     checkGrowth(state);
    //     addNewFood(state);
    //     //console.log(getRandomPosition(20))

        
    //     renderGame();
    //     // console.dir(state.snake.direction, state.snake.tail);
    // }, 400);


});


