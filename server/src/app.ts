import express from 'express';
import 'express-async-errors';
import * as middlewares from './middlewares/middlewares';
import passport from 'passport';
import { sessionHandler } from './config/sessionConfig';
import { authRouter } from './routes/v1/auth';
import { filesRouter } from './routes/v1/files';
import { folderRouter } from './routes/v1/folder';
import { sharedFolderRouter } from './routes/v1/sharedFolder';
import './middlewares/strategies';
import { corsOptions } from './config/config';
import cors from 'cors';

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionHandler);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (_req, res) => {
  res.json({ message: 'welcome to ulapdrive api' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/files', middlewares.isAuthenticated, filesRouter);
app.use('/api/v1/folders', middlewares.isAuthenticated, folderRouter);
app.use('/api/v1/shared', sharedFolderRouter);
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

export default app;
