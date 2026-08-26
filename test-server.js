const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8124;
const root = __dirname;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript' };

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(root, urlPath === '/' ? '/index.html' : urlPath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('Serving hosted/ on http://localhost:' + port));
