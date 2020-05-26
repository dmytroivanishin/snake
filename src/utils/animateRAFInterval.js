const animateRAFInterval = {
    id: null,
    start: null,
    canceled: false,
    cancel() {
        if(!this.id){
            return false;
        }
        cancelAnimationFrame(this.id);
        this.id = null;
        this.canceled = true;
    }
};

const startRAFInterval = (cb) => {

    if(!cb){
        throw new Error("Callback function is undefined.");
    }
    if(typeof cb !== "function"){
        throw new TypeError("Callback is not a function.");
    }
    
    animateRAFInterval.canceled = false;
    
    const animate = (time) => {

        cb(time);
        
        if(!animateRAFInterval.canceled){
            animateRAFInterval.id = requestAnimationFrame(animate);
        }
        
    };

    if(!animateRAFInterval.canceled){
        animateRAFInterval.id = requestAnimationFrame(animate);
    }
    
};

animateRAFInterval.start = startRAFInterval;

export default animateRAFInterval;