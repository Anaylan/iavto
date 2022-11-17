var https = require('https');
var fs = require('fs');
const path = require('path');
const { parse } = require('url');

const next = require('next');
const port = 443;
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'lockpixel.ru';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

var options = {
  key: fs.readFileSync('lockpixel.ru-key.pem'),
  cert: fs.readFileSync('lockpixel.ru.pem'),
};

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port}`);
    });
});
