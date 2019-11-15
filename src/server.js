import https from 'https';
import fs from 'fs';

import app from './app';

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

https.createServer(options, app).listen(3333);
