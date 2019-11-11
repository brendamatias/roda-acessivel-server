import https from 'https';
import http from 'http';
import fs from 'fs';

import app from './app';

const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert'),
};

http.createServer(app).listen(3333);
https.createServer(options, app).listen(3333);
