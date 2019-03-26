class Port {
    
    constructor () {
        this.port = "";
        this.isPort = false;
        this.minPort = 0;
        this.maxPort = 65535;
    }
    
    validatePort(port) {
    
        if (this.validateInt(port) === true) {
            if (this.minPort <= port && port <= this.maxPort) {
                return true;
            } else {
                throw "Invalid Port Number";
            }
        }
        else {
            throw "Invalid Port Number";
        }
    }
    
    validateInt(number) {
        let numberRegex = /^(\d).*$/;
        return numberRegex.test(number);
    }
}


//module.exports = Port;