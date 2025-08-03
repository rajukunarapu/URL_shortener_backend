const express = require('express');
const { shortenController, redirectController, statsController, getAllUrlsController } = require('../Controllers/URLControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

router.get('/all',authMiddleware, getAllUrlsController);
router.post('/shorten',authMiddleware ,shortenController);
router.get('/:code', authMiddleware, redirectController);
router.get('/stats/:code',authMiddleware ,statsController);

module.exports = router;