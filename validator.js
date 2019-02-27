class UrlCheck {

    constructor (url) {
        
        if (url == "" || url == undefined || url == null) {
            throw "NO URL";
        }

        this.url = url;
        this.hostname = "";
        this.protocol = "";
        this.port = "";
        this.parameter = ""; 

        this.validProtocolList = ["http", "https", "ftp"];
        this._validProtocolExist = /^(?:(?:\w+):\/\/){1}/;
        this._validProtocol = new RegExp ("^("+this.validProtocolList.join("|")+"?):\/\/([^:\/\s]+)", "i");
        this._validSpecialCharacter = /[\.\!\@\#\$\%\^\&\*\(\)\+\~\\\;\[\]\'\,\.\:\/\{\}\\<\>\?\`\|]/;
        this._validPort = /(\:\d+$)/;
        
        this.isUrl();
        
    }

    /**
        * @brief Remove Protocol String from URL
        * @param {String} url URL String
        * @return {String} URL String without Protocol
    */
    removeProtocolString(url) {
        var regex = /^(?:(ht|f)tp(s?)\:\/\/)?/;
        return url.replace(regex, '');
    }


    /**
        * @brief Check is Valid Protocol
        * @detail if protocol is valid it will add "http://" in front of string, if not, return empty string
        * @param {String} url Protocol String
        * @return {String} URL String
    */
    isValidProtocol(url) {
        if (this._validProtocolExist.test(url)) {
            if (!this._validProtocol.test(url)) {
                url = "";
            }
        } else {
            url = "http://" + url;
        }

        return url;
    }

    /**
        * @brief check is valid URL
        * @return {Bool} if url is valid, true if not, false
    */
    isUrl() {
        var hostSplit = [];
        var hostSearch = [];
        var splitDelim = '.';

        //check is protocol exists
        this.url = this.isValidProtocol(this.url);
 
        if (this.url == "") {
            //protocol error
            throw "INVALID PROTOCOL";
        }

        //protocol string
        this.protocol = this.url.match(this._validProtocolExist);

        //protocol error 
        if (this.protocol == undefined || this.protocol == "" || this.protocol == null) {
            throw "NO PROTOCOL";
        }

        //protocol error
        if (!Array.isArray(this.protocol)) {
            throw "PROTOCOL ERROR";
        }

        //remove protocol from hostname 
        this.hostname = this.url.replace(this.protocol[0], "");
 
        
        this.protocol = this.protocol[0].replace("://", "");

        //split last character of hostname (is it / or ?)
        if (this.hostname.indexOf("/") != -1) {
            hostSearch = this.hostname.split("/");
            this.hostname = hostSearch[0];
            hostSearch.shift();
            this.parameter = hostSearch.join("");
        }
        //split GET request parameter
        else if (this.hostname.indexOf("?") != -1) {
            hostSearch = this.hostname.split("?");
            this.hostname = hostSearch[0];
            hostSearch.shift();
            this.parameter = hostSearch.join("");
        }
        
        this.hostname = this.hostname.replace(/^www\./gi, "");


        //split hostname with .
        hostSplit = this.hostname.split(splitDelim);

        //check depth of sub domain
        if (hostSplit.length > 127 || hostSplit.length == 0) {
            if (hostSplit.length > 127) {
                throw "OVER 127 SUB DOMAIN"; 
            }
            else {
                throw "NO HOSTNAME"; 
            }
        }

        //check Top domain is exist
        //ex)naver.com -> normal, navercom-> error
        if (hostSplit.length < 2) {
            throw "INVALID HOSTNAME"; 
        }

        //Check max hostname length
        if (this.hostname.length > 253) {
            throw "OVER HOSTNAME LENGTH LIMIT"; 
        }


        for (var i = 0; i < hostSplit.length; i++) {
            //each part of hostname's (split by .) length should be less than 63
            if (hostSplit[i].length > 63) {
                throw "OVER HOSTNAME LENGTH LIMIT";
            }

            //check special chacter of hostname (Authorized special chacter only)
            if (this._validSpecialCharacter.test(hostSplit[i])) {
                if (i != hostSplit.length - 1) {
                    throw "INVALID SPECIAL CHAR";
                } else {
                    //check is valid port type
                    if (!this._validPort.test(hostSplit[i])) {
                        throw "INVALID PORT TYPE";
                    }
                    
                    //get port number
                    let portInfo = hostSplit[i].match(this._validPort);
                    if (portInfo.length > 0) {
                        this.port = portInfo[0].replace(":", "")
                        this.hostname = this.hostname.replace(portInfo[0], "");
                    }
                }
            }
        }

        return true;  
    }
}