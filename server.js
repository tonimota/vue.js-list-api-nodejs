const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');

server.use('/dist', express.static(path.join(__dirname, './dist')));

server.get('*', (req, res) => { 
  renderer.renderToString(app, context, function (err, html) {   
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  }, (err) => {
    console.log(err);
  });
}); 
server.listen(8080);