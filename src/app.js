import createError from 'http-errors';
import express from 'express';
import './config/database';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes';

// load server application
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// load routes
routes(app);

// catch 404
app.use((req, res, next) => {
  const error = createError(404);
  console.error(error);
  res.status(error.status).send(error.message);
});

export default app;
