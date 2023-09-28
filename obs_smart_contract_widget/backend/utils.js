const fs = require('fs');
const http = require('http');
const path = require('path');


function getContentType(fileExtension) {
    switch (fileExtension) {
      case '.html':
        return 'text/html';
      case '.js':
        return 'text/javascript';
      case '.css':
        return 'text/css';
      case '.png':
        return 'image/png';
      case '.jpg':
        return 'image/jpg';
      default:
        return 'application/octet-stream';
    }
  }

  function createHTTPServer(folderToServe){
    return http.createServer((request, response) => {
        let filePath = folderToServe + request.url;
    
      if (filePath === folderToServe + '/') {
        filePath = folderToServe + '/index.html'; // Wenn keine Datei angegeben ist, verwenden Sie index.html als Standard
      }
    
      // Ermitteln Sie den Dateipfad auf dem Server
      const fileExtension = path.extname(filePath);
      const contentType = getContentType(fileExtension);
    
      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (error.code === 'ENOENT') {
            response.writeHead(404);
            response.end('Datei nicht gefunden');
          } else {
            response.writeHead(500);
            response.end('Interner Serverfehler: ' + error.code);
          }
        } else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
      });
  }


  module.exports = { getContentType, createHTTPServer };