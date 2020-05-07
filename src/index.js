import animateRAFInterval from "./utils/animateRAFInterval";
console.log("Hello, Webpack!");

class Test {
    constructor(){
        this.name = "Dima";
    }

    getName() {
        console.log(this.name);
    }
}

new Test().getName();

animateRAFInterval.fn((time) => {
    console.log(time);
}, 1000);


console.log("Bye, Webpack!");