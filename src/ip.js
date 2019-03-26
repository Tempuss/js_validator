class Ip {

    constructor () {
        this.ip = "";
        this.isIp = false;
    }
    
    validateIP (ip) {
        let ipRegex = /(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/gimu;
        return ipRegex.test(ip);
    }
    
    getIp() {
        return this.ip;
    }

    setIP (ip) {
        this.isIp = this.validateIP(ip);
        
        if (this.isIp === true) {
            this.ip = ip;
        } 
    }
    
}


class SubNetMask extends Ip {

    constructor () {
        this.prefix = "";
    }

    setSubNetMask(subNetMask) {
        let prefix = "";
        let subNet = "";
        let splitResult = subNetMask.split("/"); 
        
        if (splitResult.length != 2) {
        
            throw "No SubNetMask";
            
        } else {
        
            subNet = splitResult[0];
            prefix = splitResult[1];
            
            if (this.validateIP(subNet) !== true) {
                throw "Invalid SubnetMask (IP)";
            }
            
            if (this.validatePrefix(prefix) !== true) {
                throw "Invalid SubnetMask (Prefix)";
            }
            
            this.ip = subnet;
            this.prefix = prefix;
            
        }
        
    }
    
    getSubNetMask () {
    
    }
    
    validateSubNetMaskRange () {

    }
    
    validatePrefix (prefix) {
        
        if (prefix <= 0 && prefix >= 32) {
            return false;
        }
       
        return true;
    }
}



//module.exports = Ip;