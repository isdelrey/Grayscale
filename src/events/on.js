module.exports = class On {
    static do(fn) {
        if(typeof fn !== 'function') {
            throw "Can't do what can't be done";
            return;
        }
        (this.todo||(this.todo = [])).push(fn);
    }
    static trigger() {
        let promises = [];
        for(let what of this.todo)
            promises.push(what.call());
        return (promises == null) ? Promise.resolve() : Promise.all(promises);
    }
};