class Url {

    constructor(url) {

        this.protocol = new Protocol();
        this.domain = new Domain();
        this.ip = new Ip();
        this.port = new Port();

        this.url = "";
        this.parameter = "";
        this._validSpecialCharacter = /[\.\!\@\#\$\%\^\&\*\(\)\+\~\\\;\[\]\'\,\.\:\/\{\}\\<\>\?\`\|]/;
    
        if (url == "" || url == undefined || url == null) {

            throw "NO URL";

        }
        this.url = url;


        
        this.isValidUrl();

    }

    isValidUrl() {

        this.url = this.protocol.modifyUrlProtocol(this.url);

        let getHostname = function(url,protocol) {

            let result = url.replace(protocol.getProtocol()+"://", "")

            result = result.replace(/^www\./gi, "");

            return result;
        }

        let hostname = getHostname(this.url, this.protocol);

        hostname = this.getParameter(hostname);

        this.domain.setDomain(hostname);
        

        let domainLabel = this.domain.getLabel();
        let topDomain = this.domain.getTopDomain();

        if (this.port.validatePortExist(topDomain)) {

            this.port.setPort(topDomain);

            this.domain.setDomain(this.domain.getDomain().replace(":"+this.port.getPort(), ""));
        }

        // Check special chacter of hostname (Authorized special chacter only)
        for (let i=0;i<domainLabel.length;i++) {
            if (this._validSpecialCharacter.test(domainLabel[i])) {

                if (i != domainLabel.length - 1) {

                    throw "Invalid Special Character";

                } 
            }
        }

        
        
    }

    getParameter(hostname) {

        let hostSearch = [];

        // Split last character of hostname (is it / or ?)
        if (hostname.indexOf("/") != -1) {

            hostSearch = hostname.split("/");
            hostname = hostSearch[0];
            hostSearch.shift();
            this.parameter = hostSearch.join("");

        }
        // Split GET request parameter
        else if (hostname.indexOf("?") != -1) {

            hostSearch = hostname.split("?");
            hostname = hostSearch[0];
            hostSearch.shift();
            this.parameter = hostSearch.join("");

        }

        return hostname;
    }
}


