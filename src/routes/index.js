import express from 'express';

import index from './navigation';

const app = express();

app.use('/', index);
app.use('/index', index);

export default app;
