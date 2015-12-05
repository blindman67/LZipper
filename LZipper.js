// By Mark Spronck. markspronck@gmail.com
// Simple LZ compression and decompression JavaScript utility 
// Usage
// var data = Any javascript string
// var compressed = LZipper.compress(data);  
// var uncompressed = LZipper.decompress(compressed);

var LZipper = (function () {
    var fcc, API;
    // just shorthand from char code.
    fcc = String.fromCharCode;
    API = {  // exposed interface for LZipper
        compress : function( str ){ return str; },
        decompress : function( str ){ return str; },    
    };    
    // function compress data
    // data is a string
    // returns a string
    function compress( data ) {
        function dec(numBits, v, noShift) {
            var i, m = noShift ? 0xFFFFFFFFFFFF : 1;  // dictionary wont go over 48Bits??? 
            for (i = 0; i < numBits; i++) {
                val = (val << 1) | (v & m);
                if (pos === 15) {
                    pos = 0;
                    str += fcc(val);
                    val = 0;
                } else {
                    pos++;
                }
                if (noShift) {
                    v = 0;
                } else {
                    v >>= 1;
                }
            }
        }
        if (data === null || data === undefined || data === "") {
            return "";
        }
        var i, ii, f,c,w,wc,enlargeIn,dictSize,numBits,str,val,pos,len;
        len = data.length;        
        dic = new Map();  // dictionary 
        c = w = wc = "";
        w = "";
        enlargeIn = numBits = 2;
        dictSize = 3;
        str = "";
        val = pos = 0;
        for (ii = 0; ii < len; ii += 1) {
            c = data.charAt(ii);
            if (!dic.has(c)) {
                dic.set(c,{size:dictSize++,create:true});
            }
            wc = w + c;
            if (dic.has(wc)) {
                w = wc;
            } else {
                if (dic.has(w) && dic.get(w).create) {
                    if (w.charCodeAt(0) < 256) {
                        dec(numBits, 0);
                        dec(8, w.charCodeAt(0));
                    } else {
                        dec(numBits, 1, true)
                        dec(16, w.charCodeAt(0));
                    }
                    enlargeIn--;
                    if (enlargeIn === 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }
                    dic.get(w).create = false;
                } else {
                    dec(numBits, dic.get(w).size);
                }
                enlargeIn--;
                if (enlargeIn === 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                if(dic.has(wc)){
                    dic.get(wc).size = dictSize++;
                }else{
                    dic.set(wc,{size:dictSize++,create:false});
                }
                w = String(c);
            }
        }
        if (w !== "") {
            if (dic.has(w) && dic.get(w).create) {
                if (w.charCodeAt(0) < 256) {
                    dec(numBits, 0);
                    dec(8, w.charCodeAt(0));
                } else {
                    dec(numBits, 1, true)
                    dec(16, w.charCodeAt(0));
                }
                enlargeIn--;
                if (enlargeIn === 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                dic.get(w).create = false;
            } else {
                dec(numBits, dic.get(w).size);
            }
            enlargeIn--;
            if (enlargeIn === 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
            }
        }
        dec(numBits, 2);
        while (true) {
            val <<= 1;
            if (pos == 15) {
                str += fcc(val);
                break;
            } else {
                pos++;
            }
        }
        return str;
    }
    // function decompress
    // cp is a string of compressed data
    // returns an uncompressed string
    function decompress(cp) {
        var dic,len,s,w,bits,c,enlargeIn,dicSize,numBits,entry,result,str,val,pos,index;
        function dec(maxP){
            var p = 1,b = 0;
            while (p != maxP) {
                b |= ((val & pos) > 0 ? 1 : 0) * p;
                p <<= 1;
                pos >>= 1;
                if (pos === 0) {
                    pos = 32768;
                    val = str.charCodeAt(index++);
                }
            }
            return b;
        }
        if (cp === null || cp === "" || cp === undefined){ return "";}
        dic = [0,1,2];
        len = cp.length
        s = [256,65536];
        enlargeIn = dicSize = 4;
        numBits = 3;
        entry = result = "";
        str = cp;
        val = cp.charCodeAt(0);
        pos = 32768;
        index = 1;
        
        bits = dec(4);
        if(bits === 2){ 
            return ""; 
        } else if(bits < 2){
            bits = dec(s[bits]);
            c = fcc(bits);
        }
        dic[3] = w = result = c;
        while (true) {
            if (index > len) { 
                return ""; 
            }
            c = bits = dec(Math.pow(2, numBits));
            if(bits === 2){ 
                return result;  
            } else if(bits < 2){
                bits = dec(s[bits]);
                dic[dicSize++] = fcc(bits);
                c = dicSize - 1;
                enlargeIn--;
            }
            if (enlargeIn === 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
            }
            if (dic[c]) {
                entry = dic[c];
            } else {
                if (c === dicSize) {
                    entry = w + w.charAt(0);
                } else {
                    return "";
                }
            }
            result += entry;
            dic[dicSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn === 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
            }
        }
    }    
    if(typeof Map === 'function'){
        API.compress = compress;
        API.decompress = decompress;
    }
    return API;
})();
