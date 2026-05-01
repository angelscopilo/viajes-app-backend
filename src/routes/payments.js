const express = require('express');
const router = express.Router();

const { createDeposit } = require('../controllers/paymentController');
const { handleOpenpayWebhook } = require('../services/webhookService');
const { authenticateToken } = require('../middleware/auth');

// Rutas protegidas
router.post('/deposit', authenticateToken, createDeposit);

// Webhook de Openpay (público - NO requiere token)
router.post('/webhook/openpay', handleOpenpayWebhook);

module.exports = router;
