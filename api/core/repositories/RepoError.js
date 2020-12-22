/*class RepoError extends Error {
    constructor(message, name=null) {
        super(message);
        this.name = name;
    }
    toString() {
        return ((this.name === undefined)? "" : this.name + ": ") + this.message;
    }
}

module.exports = RepoError;
*/

function CustomException(message) {
    const error = new Error(message);
    return error;
}

CustomException.prototype = Object.create(Error.prototype);
