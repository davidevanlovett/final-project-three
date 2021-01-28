const router = require('express').Router();
const stripeRoutes = require('./stripeController');

// Import our controllers
// const noteRoutes = require('./notesController');
const userRoutes = require('./usersController');
const authRoutes = require('./authController');
const raffleRoutes = require('./rafflesController.js');

// Hook up to the router
// router.use('/api/notes', noteRoutes);
router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);

router.use('/create-checkout-session', stripeRoutes);

router.use('/api/raffles', raffleRoutes);


// Export the router
module.exports = router;

