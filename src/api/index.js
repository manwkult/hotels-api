import express from 'express';

import hotels from './hotels';

const app = express();

app.use('/api/hotels', hotels);

export default app;
