const animateRAFInterval = (function(){
    let id = null, canceled = false;

    const start = (cb) => {
        if(!cb){
            throw new Error("Callback function is undefined.");
        }
        if(typeof cb !== "function"){
            throw new TypeError("Callback is not a function.");
        }

        canceled = false;

        const animate = (time) => {
            cb(time);
            
            if(!canceled){
                id = requestAnimationFrame(animate);
            }
        };
    
        if(!canceled){
            id = requestAnimationFrame(animate);
        }
    };

    const cancel = () => {
        if(!id){
            return false;
        }
        
        cancelAnimationFrame(id);

        id = null;
        canceled = true;
    };

    return { start, cancel };
}());

export default animateRAFInterval;