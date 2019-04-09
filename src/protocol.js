class Protocol {

    constructor () {

        this.protocol = "";
        this.isValid = false;
        
        this.validProtocolList = [
            "http",
            "https",
            "ftp"
        ];
        
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

}