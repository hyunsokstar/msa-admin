// server.ts
import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/nexus-task-master.shop/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/nexus-task-master.shop/fullchain.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(443, () => {
    console.log('> Ready on https://nexus-task-master.shop');
  });

  // HTTP to HTTPS 리다이렉션 추가 (선택 사항)
  require('http').createServer((req: import('http').IncomingMessage, res: import('http').ServerResponse) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80);
});