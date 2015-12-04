## LZ JavaScript compression

> LZ compression for JavaScript compresses and decompresses JavaScript strings. 

## Features

- Light weight LZipper.min.js 1.9K
- Easy to use.

## Status

First release for ECMAScript6

## Including it in you project

Simlply add `LZipper.js` or `LZipper.min.js` into your existing js code. Or add the following to your page

```
<script src="LZipper.min.js"></script>
```

## API

LZipper.js as the object `LZipper` to the global namespace providing two functions 

String = LZipper.compress(String);
String = LZipper.decompress(String)

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

// myObject represents a javascript object.
localStorage.myData = LZipper.compress ( JSON.stringify (myObject) ); // save compress JSON to local storage

// Retrieval
var myObject;
if (localStorage.myData !== undefined) {
    myObject = JSON.parse ( LZipper.decompress ( localStorage.myData ));
}
    
## Current limitations.

Requires JavaScript `Map` object. If 'Map' is not available LZipper simple does not compress the string but will not fail.



