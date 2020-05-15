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

const startRAFInterval = (cb, time = 1) => {

    if(!cb){
        throw new Error("Callback function is undefined.");
    }
    if(typeof cb !== "function"){
        throw new TypeError("Callback is not a function.");
    }
    
    animateRAFInterval.canceled = false;

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