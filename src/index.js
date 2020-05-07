import animateRAFInterval from "./utils/animateRAFInterval";
import getDirection from "./utils/getDirection";

// console.log("Hello, Webpack!");

// class Test {
//     constructor(){
//         this.name = "Dima";
//     }

//     getName() {
//         console.log(this.name);
//     }
// }

// new Test().getName();

// animateRAFInterval.fn((time) => {
//     console.log(time);
// }, 1000);


// console.log("Bye, Webpack!");

document.addEventListener("keydown", (e) => {
    console.log(e);
    console.log(getDirection(e.keyCode));
});