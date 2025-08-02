const express = require('express');
const { shortenController, redirectController, statsController } = require('../Controllers/URLControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();


router.post('/shorten',authMiddleware ,shortenController);
router.get('/:code', authMiddleware, redirectController);
router.get('/stats/:code',authMiddleware ,statsController);

module.exports = router;