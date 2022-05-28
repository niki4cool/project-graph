

const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({noServer: true});

const clients = new Set();

function accept(req, res) {

  if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&

      req.headers.connection.match(/\bupgrade\b/i)) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`новое подключение`);

  ws.on('сообщение', function(message) {
    log(`получено сообщение: ${message}`);

    message = message.slice(0, 50);

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('закрыть', function() {
    log(`подключение закрыто`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http.createServer(accept).listen(8080);
} else {

  log = function() {};

  exports.accept = accept;
}