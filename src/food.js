export default class Food {
    constructor(state){
        this.state = state;
    }

    addNewFood() {
        const cordsNewFood = this._getFreeSpace(this.state);
    
        if(cordsNewFood){
            this.state.food.apples = {
                x: cordsNewFood.x,
                y: cordsNewFood.y
            }
            this.state.food.didAte = false;
        }
    }

    _getRandomPosition(num) {
        return Math.floor(Math.random() * num);
    }
    
    _getFreeSpace({ snake, food }) {
        const { tail } = snake;
        const { didAte } = food;
        let isNewCordsFood = true,
            x, y;
    
        if(!didAte){
            return false;
        }
    
        while(isNewCordsFood){
    
            x =  this._getRandomPosition(20),
            y =  this._getRandomPosition(20);
    
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
};