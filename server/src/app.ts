import express from 'express';
import 'express-async-errors';
import { errorHandler } from './middlewares/middlewares';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'welcome to ulapdrive api' });
});

app.use(errorHandler);

export default app;
