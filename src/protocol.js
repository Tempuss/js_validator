class Protocol {

    constructor () {

        this.protocol = "";
        this.isValid = false;
        
        this.validProtocolList = [
            "http",
            "https",
            "ftp"
        ];

        this._validProtocolExist = /^(?:(?:\w+):\/\/){1}/;
        this._validProtocol = new RegExp(`^(${this.validProtocolList.join("|")}?):\/\/([^:\/\s]+)`, "i");
        
    }

    validateProtocol(protocol) {
        if (this.validProtocolList.indexOf(protocol) == -1) {
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

    getValidProtocolList() {

    }

}