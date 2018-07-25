import express from 'express';

const router = express.Router();

/* GET Index page. */
router.get('/', (req, res) => {
  res.render('index', { locals: { title: 'Hotels - API' } });
});

export default router;
