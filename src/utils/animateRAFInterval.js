const animateRAFInterval = {
    id: null,
    start: null,
    cancel() {
        if(!this.id){
            return false;
        }
        cancelAnimationFrame(this.id);
        this.id = null;
    }
};

const startRAFInterval = (cb, time = 1) => {

    if(!cb){
        throw new Error("Callback function is undefined.");
    }
    if(typeof cb !== "function"){
        throw new TypeError("Callback is not a function.");
    }
        
    let startTime			= null,
        currentTime			= 0,
        rest				= 0,
        previosMillisecond	= 0,
        currentMillisecond	= 0;
    
    const animate = () => {
        currentTime = new Date().getTime();

        if (startTime === null) {
            startTime = currentTime;
        }
        
        rest = (currentTime - startTime) % time;
        currentMillisecond = (currentTime - startTime) - rest;

        if(previosMillisecond !== currentMillisecond){
            previosMillisecond = currentMillisecond;
            cb(currentMillisecond);
        }
        
        animateRAFInterval.id = requestAnimationFrame(animate);
    };

    animateRAFInterval.id = requestAnimationFrame(animate);
    
};

animateRAFInterval.start = startRAFInterval;

export default animateRAFInterval;