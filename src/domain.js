//import Ip from './ip.js';

class Domain {

    constructor () {
        this.maxDomainLength = 255; 
        this.maxLabelLength = 63; 
    
        this.domain = "";
        this.label = [];
        
    }
    
    setDomain(domain) {
        this.domain = domain;
        
        this.splitDomainLabel();
        
        if (this.validateDomainLength() == false) {
           throw "Over Domain Length"; 
        }
        
        if (this.validateLabelLength() == false) {
           throw "Over Label Length"; 
        }
        
        if (this.validateLabelRegex() == false) {
           throw "Invalid Domain"; 
        }
    }
    
    splitDomainLabel() {
        let splitChar = ".";
        let splitResult = this.domain.split(splitChar);
        splitResult.pop();
        
        this.label = splitResult;
    }
    
    validateDomainLength() {
        let splitChar = ".";
        let splitResult = this.domain.split(splitChar);
        let topDomain = splitResult.pop();
        let removeTopDomain = this.domain.replace("."+topDomain, "");
        
        if (0 < removeTopDomain.length && removeTopDomain.length < this.maxDomainLength) {
           return true;
        }
        
        return false;
    }
    
    validateLabelLength() {
        if (0 < this.label.length && this.label.length < this.maxLabelLength) {
            return true;
        }
        
        return false;
    
    }
    
    validateLabelRegex() {
        let labelRegex = /^((?![0-9]+$)(?!-)[a-zA-Z0-9-]+)$/gim;
        let loopLimit = this.label.length;
        
        for(let i=0;i<loopLimit;i++) {
        
            let regexResult = labelRegex.test(this.label[i]);
            
            if (regexResult == false) {
                return false;
            }
        }
        
        return true;

    }
    
}