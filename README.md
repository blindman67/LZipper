## LZ JavaScript compression

> LZ compression for JavaScript compresses and decompresses JavaScript strings. 

## Features

- Easy to use.
- Fast LZipperLite.js is faster than any LZW JavaScript compression I have tested so far.

## Status

First release for ECMAScript6
Added LZipperLite that is compatible with ECMAScript5
Removed older versions now only using LZipperLite

## Including it in you project

Simply add `LZipperLite.js`

```
<script src="LZipperLite.js"></script>
```

## API

LZipperLite.js  adds the global object `LZipper` to the global name-space providing four functions 

```
String = LZipper.compress(String);
String = LZipper.decompress(String)
String = LZipper.char2Int(String)
String = LZipper.int2Char(String)
```

Methods.

`LZipper.compress`
Arguments 
`data` a String to be compressed.
returns 
a string representing a compressed version of the input string

`LZipper.decompress`
Arguments 
`compressed` a compressed string.
returns 
an uncompressed string.

`LZipper.int2Char`
Arguments
`String`  a javascript 16 bit unicode string
returns
`String` 8 bit encoded unicode string. Uses only the first 8bits to encode all the unicode characters so that the string can be converted to Base64 via `window.btoa`

`LZipper.int2Char`
Arguments
`String`  a javascript 8 bit encoded 16bit unicode string. See above 
returns
`String` The 16 bit unicode string

## Usage example

LZipper is handy for storing data in localStorage

Save to local storage.
```
// myObject represents a javascript object.
localStorage.myData = LZipper.compress ( JSON.stringify (myObject) ); // save compress JSON to local storage
```

Retrieval.
```
var myObject;
if (localStorage.myData !== undefined) {
    myObject = JSON.parse ( LZipper.decompress ( localStorage.myData ));
}
```    

I have added two functions to allow the compressed string to be converted to Base64 so it can be added to a URL, this is to deal with the URL size limitations that browsers have.

To compress and add to a URL
```
var data = JSON.stringify(myData);
var href = "http://myweb.com/page.html?data=" + btoa(LZipper.int2Char(LZipper.compress(data)))
```

To decompress from url
```
var data = location.href.split("?data=")[0];
var myData = JSON.parse(LZipper.decompress(LZipper.char2Int(atob(data))));
```


## Current limitations.

Knowledge of JavaScript



