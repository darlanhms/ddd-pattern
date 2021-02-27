import 'reflect-metadata';
import bodyParser from 'body-parser';
import express from 'express';

import router from './routes';

const app = express();

app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
  return res.send(new Date());
});

export default app;
