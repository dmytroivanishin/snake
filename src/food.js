const getRandomPosition = (num) => {
    return Math.floor(Math.random() * num);
}

const getFreeSpace = ({ snake, food }) => {
    const { tail } = snake;
    const { didAte } = food;
    let isNewCordsFood = true,
        x, y;

    if(!didAte){
        return false;
    }

    while(isNewCordsFood){

        x = getRandomPosition(20),
        y = getRandomPosition(20);

        for(let t = 0; t < tail.length; t+=1){
            if(tail[t].x === x && tail[t].y === y){
                isNewCordsFood = true;
                break;
            }
            else{
                isNewCordsFood = false;
            }
        }
    }

    return {x, y};
}

export const addNewFood = (state) => {
    const cordsNewFood = getFreeSpace(state);

    if(cordsNewFood){
        state.food.apples = {
            x: cordsNewFood.x,
            y: cordsNewFood.y
        }
        state.food.didAte = false;
    }
}
