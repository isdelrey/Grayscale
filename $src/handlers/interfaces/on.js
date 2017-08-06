module.exports = class On {
    static do(fn) {
        if(typeof fn !== 'function') {
            throw "Can't do what can't be done";
            return;
        }
        (this.todo||(this.todo = [])).push(fn);
    }
    
};