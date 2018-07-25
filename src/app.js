import 'babel-polyfill';

import http from 'http';
import path from 'path';
import express from 'express';
import es6Renderer from 'express-es6-template-engine';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import cors from 'cors';

import signale from 'signale';

import routes from './routes';
import api from './api';

const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, './assets')));

if (!isProduction) {
  app.use(errorHandler());
}

// route
app.use(routes);

// api
app.use(api);

const server = http.Server(app);
server.listen(port, () => signale.complete({ prefix: '[server]', message: 'hotels api - started succefully', suffix: `(port -> ${port})` }));

// catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});
