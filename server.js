var express = require('express');
const http = require('http');
var app = express();
const fs = require('fs');
var server = http.createServer(app);


http.createServer(function(request, response) {
 
    fs.readFile('products.json', function(err, content){
        response.write(content);
        response.end();
    });

}).listen(3005);

console.log("Listening on port " + 3005 );