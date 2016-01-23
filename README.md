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

LZipperLite.js  adds the globale object `LZipper` to the global namespace providing two functions 

```
String = LZipper.compress(String);
String = LZipper.decompress(String)
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
## Current limitations.

Knowlage of JavaScript



