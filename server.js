const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);

const fsReadFile = (pageFileName, contentType) => {
  fs.readFile(pageFileName, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
}
const fsReadFileCSS = (filePath) => {
  fs.readFile(filePath, function(err, data) {
    res.write(data);
    res.end();
  });
}
  console.log(page);
  if (page == '/') {
    fsReadFile('index.html', 'text/html')
    
  }
  else if (page == '/otherpage') {
    fsReadFile('otherpage.html','text/html')
    
  }
  else if (page == '/otherotherpage') {
    fsReadFile('otherotherpage.html', 'text/html')
    // fs.readFile('otherotherpage.html', function(err, data) {
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.write(data);
    //   res.end();
    // });
  }
  else if (page == '/api') {
    if('student' in params){
      if(params['student']== 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    // fs.readFile('css/style.css', function(err, data) {
    //   res.write(data);
    //   res.end();
    // });
    fsReadFileCSS('css/style.css');
  }else if (page == '/js/main.js'){
    
    fsReadFile('js/main.js', 'text/javascript')
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
