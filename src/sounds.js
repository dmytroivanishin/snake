import { Howl } from "howler";

class Sounds {
    constructor(){
        this.playlist = {}
    }

    add(name, arg) {
        this.playlist[name] = new Howl({
            src: arg
        });

        return this;
    }
};

export default Sounds;