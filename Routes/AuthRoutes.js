const express = require('express');
const {signupController, loginController, isAuthenticatedController, logoutController} = require('../Controllers/AuthControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

// Create a new router instance
const router = express.Router();

// Define routes for authentication
router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/isAuthenticated', authMiddleware,isAuthenticatedController);
router.get('/logout', authMiddleware, logoutController);


// Export the router to be used in the main app
module.exports = router;