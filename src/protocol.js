class Protocol {

    constructor () {

        this.protocol = "";
        this.isValid = false;
        
        this._validProtocolList = [
            "http",
            "https",
            "ftp"
        ];

        this._validProtocolExist = /^(?:(?:\w+):\/\/){1}/;
        this._validProtocol = new RegExp(`^(${this._validProtocolList.join("|")}?):\/\/([^:\/\s]+)`, "i");
        
    }

    validateProtocol(protocol) {
        if (this._validProtocolList.indexOf(protocol) == -1) {
            return false;
        }

        return true;
    }

    setProtocol(protocol) {
        protocol = protocol.toLowerCase();

        if (!this.validateProtocol(protocol)) {
            throw "Invalid Protocol";
        }

        this.protocol = protocol;
        this.isValid = true;
        
    }

    getProtocol() {
        return this.protocol;
    }

    isProtocolExist(url) {
        if (this._validProtocolExist.test(url)) {
            let result = url.match(this._validProtocolExist);
            let protocol = "";

            if (!Array.isArray(result)) {

                throw "PROTOCOL ERROR";
    
            }
    
            protocol = result[0].replace("://", "");

            this.setProtocol(protocol);

            return true;
        } else {
            return false;
        }
    }

    modifyUrlProtocol(url) {
        if (this.isProtocolExist(url)) {
            return url;
        } else {
            return "http://"+url;
        }
    }


}