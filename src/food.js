import { addFood } from './store/action';
import { row } from "./settings";

export default class Food {
    constructor(store){
        this.store = store;
    }

    addNewFood() {
        const cordsNewFood = this._getFreeSpace();
        
        if(cordsNewFood){
            this.store.dispatch(addFood(cordsNewFood))
        }
    }

    _getRandomPosition(num) {
        return Math.floor(Math.random() * num);
    }
    
    _getFreeSpace() {
        const { snake, food, maps, level } = this.store.getState();
        const { tail } =  snake;
        const { didAte } =  food;
        const map = maps[`map${level}`];
        let isNewCordsFood = true,
            x, y;
    
        if(!didAte){
            return false;
        }
    
        while(isNewCordsFood){
    
            x =  this._getRandomPosition(row),
            y =  this._getRandomPosition(row);
    
            for(let t = 0; t < tail.length; t+=1){
                if(tail[t].x === x && tail[t].y === y){
                    isNewCordsFood = true;
                    break;
                }
                else{
                    isNewCordsFood = false;
                }
            }

            if(isNewCordsFood){
                continue;
            }

            for(let m = 0; m < map.cords.length; m+=1) {
                if(map.cords[m].x === x && map.cords[m].y === y) {
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