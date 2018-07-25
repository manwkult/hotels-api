import express from 'express';
import { listHotels } from '../../methods';

const router = express.Router();

/* GET list.do */
router.get('/list.do', async (req, res) => {
  const data = await listHotels(req.query);

  if (data) {
    const { statusCode, result } = data;

    res.status(statusCode);
    res.json(result);
  } else {
    res.status(500);
    res.json({ status: 0, message: 'Ha ocurrido un error' });
  }
});

export default router;
