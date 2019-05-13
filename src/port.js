class Port {
    
    constructor () {
        this.port = "";
        this.isPort = false;
        this.minPort = 0;
        this.maxPort = 65535;

        this._validPort = /(\:\d+$)/;
    }

    setPort(port) {
        if (this.validateInt(port)) { 
            if (this.validatePort(port)) {
                this.port = port;
                this.isPort = true;
            }
        } else {
            let portInfo = this.extractPort(port); 
            port = portInfo[0].replace(":", "");

            if (this.validatePort(port)) {
                this.port = port;
                this.isPort = true;
            }
        }
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

    validatePortBool() {
        if (this.validateInt(port) === true) {
            if (this.minPort <= port && port <= this.maxPort) {
                return true;
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    validatePortExist(str) {

        let portInfo = this.extractPort(str);

        if (portInfo.length > 0) {

            return true;

        } else {
            return false;
        }
    }

    extractPort(str) {
        let portInfo = str.match(this._validPort);
        return portInfo;
    }

    getPort() {
        return this.port;
    }
}


//module.exports = Port;