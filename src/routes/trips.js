const express = require('express');
const router = express.Router();

const { createTrip, getTrips } = require('../controllers/tripController');
const { authenticateToken } = require('../middleware/auth');

// Solo requiere estar logueado (quitamos la restricción de role por ahora)
router.post('/', authenticateToken, createTrip);
router.get('/', authenticateToken, getTrips);

module.exports = router;
