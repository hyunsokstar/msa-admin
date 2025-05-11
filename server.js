// const { createServer } = require('https');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');

// const app = next({ dev: false });
// const handle = app.getRequestHandler();

// const httpsOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/nexus-task-master.shop/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/nexus-task-master.shop/fullchain.pem'),
// };

// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(443, () => {
//     console.log('> Ready on https://nexus-task-master.shop');
//   });

//   require('http').createServer((req, res) => {
//     res.writeHead(301, { Location: "https://" + req.headers.host + req.url });
//     res.end();
//   }).listen(80);
// });

const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const app = next({ dev: false });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/nexus-task-master.shop/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/nexus-task-master.shop/fullchain.pem'),
};

const PORT = 3000; // 3000 포트 사용

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, () => {
    console.log(`> Ready on https://localhost:${PORT}`);
  });
});