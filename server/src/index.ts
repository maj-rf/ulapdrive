import app from './app';
import http from 'http';
import { env } from './config/config';

const server = http.createServer(app);
server.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} `);
});
