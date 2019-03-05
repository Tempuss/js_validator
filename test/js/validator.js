'use strict';

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
      this.isUrl = false;

      this.validProtocolList = [
          "http",
          "https",
          "ftp"
      ];
      this._validProtocolExist = /^(?:(?:\w+):\/\/){1}/;
      this._validProtocol = new RegExp(`^(${this.validProtocolList.join("|")}?):\/\/([^:\/\s]+)`, "i");
      this._validSpecialCharacter = /[\.\!\@\#\$\%\^\&\*\(\)\+\~\\\;\[\]\'\,\.\:\/\{\}\\<\>\?\`\|]/;
      this._validPort = /(\:\d+$)/;

      this.validUrl();

  }

  /**
   * @brief Remove Protocol String from URL
   * @param {String} url URL String
   * @return {String} URL String without Protocol
   */
  removeProtocolString (url) {

      const regex = /^(?:(ht|f)tp(s?)\:\/\/)?/;

      return url.replace(regex, "");

  }


  /**
   * @brief Check is Valid Protocol
   * @detail if protocol is valid it will add "http://" in front of string, if not, return empty string
   * @param {String} url Protocol String
   * @return {String} URL String
   */
  isValidProtocol (url) {

      if (this._validProtocolExist.test(url)) {

          if (!this._validProtocol.test(url)) {

              url = "";

          }

      } else {

          url = `http://${url}`;

      }

      return url;

  }

  /**
   * @brief GET Protocol String
   * @param {String} url url string
   * @return {String} protocol string
   */
  getProtocol (url) {

      const result = url.match(this._validProtocolExist);

      if (!Array.isArray(result)) {

          throw "PROTOCOL ERROR";

      }

      return result[0].replace("://", "");

  }

  /**
   * @brief check is valid URL
   * @return {Bool} if url is valid, true if not, false
   */
  validUrl () {

      let hostSplit = [],
          hostSearch = [],
          splitDelim = ".";

      this.url = this.isValidProtocol(this.url);
      this.protocol = this.getProtocol(this.url);
      this.hostname = this.url.replace(`${this.protocol}://`, "").replace(/^www\./gi, "");

      if (this.url == "") {

          throw "INVALID PROTOCOL";

      }

      // Protocol error
      if (this.protocol == undefined || this.protocol == "" || this.protocol == null) {

          throw "NO PROTOCOL";

      }


      // Split last character of hostname (is it / or ?)
      if (this.hostname.indexOf("/") != -1) {

          hostSearch = this.hostname.split("/");
          this.hostname = hostSearch[0];
          hostSearch.shift();
          this.parameter = hostSearch.join("");

      }
      // Split GET request parameter
      else if (this.hostname.indexOf("?") != -1) {

          hostSearch = this.hostname.split("?");
          this.hostname = hostSearch[0];
          hostSearch.shift();
          this.parameter = hostSearch.join("");

      }

      // Split hostname with .
      hostSplit = this.hostname.split(splitDelim);

      // Check depth of sub domain
      if (hostSplit.length > 127 || hostSplit.length == 0) {

          if (hostSplit.length > 127) {

              throw "OVER 127 SUB DOMAIN";

          } else {

              throw "NO HOSTNAME";

          }

      }

      /*
       *Check Top domain is exist
       *ex)naver.com -> normal, navercom-> error
       */
      if (hostSplit.length < 2) {

          throw "INVALID HOSTNAME";

      }

      // Check max hostname length
      if (this.hostname.length > 253) {

          throw "OVER HOSTNAME LENGTH LIMIT";

      }


      for (let i = 0; i < hostSplit.length; i++) {

          // Each part of hostname's (split by .) length should be less than 63
          if (hostSplit[i].length > 63) {

              throw "OVER HOSTNAME LENGTH LIMIT";

          }

          // Check special chacter of hostname (Authorized special chacter only)
          if (this._validSpecialCharacter.test(hostSplit[i])) {

              if (i != hostSplit.length - 1) {

                  throw "INVALID SPECIAL CHAR";

              } else {

                  // Check is valid port type
                  if (!this._validPort.test(hostSplit[i])) {

                      throw "INVALID PORT TYPE";

                  }

                  // Get port number
                  let portInfo = hostSplit[i].match(this._validPort);

                  if (portInfo.length > 0) {

                      this.port = portInfo[0].replace(":", "");
                      this.hostname = this.hostname.replace(portInfo[0], "");

                  }

              }

          }

      }

      this.isUrl = true;

      return true;

  }

}

// Test case
describe('validator.js', function() {
  it('CORRECT URL', function() {
    var url = new UrlCheck("https://www.naver.com:443?fdsfdsf=?fdsfsdf");
    
    let expectedStr = true, 
        actualStr = url.isUrl;

    expect(actualStr).toBe(expectedStr);
  });
  
  it('NO URL', function() {
  
    expect(function() { 
      var url = new UrlCheck(""); 
    }).toThrow('NO URL');
    
  });
  
  it('INVALID PROTOCOL', function() {
    
    expect(function() { 
      var url = new UrlCheck("abc://www.naver.com:443?fdsfdsf=?fdsfsdf");
    }).toThrow('PROTOCOL ERROR');
    
  });
  
  it('INVALID HOSTNAME', function() {
    
    expect(function() { 
      var url = new UrlCheck("http://navercom?fdsfdsf=?fdsfsdf");
    }).toThrow('INVALID HOSTNAME');
    
  });
  
  it("OVER 127 SUB DOMAIN", function() {
    
    expect(function() { 
      var url = new UrlCheck("http://abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc.abc?fdsfdsf=?fdsfsdf");
    }).toThrow("OVER 127 SUB DOMAIN");
    
  });
  

  it("OVER HOSTNAME LENGTH LIMIT", function() {
    
    expect(function() { 
      var url = new UrlCheck("http://abc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abcabc.abc?fdsfdsf=?fdsfsdf");
    }).toThrow("OVER HOSTNAME LENGTH LIMIT");
    
  });
  
});

