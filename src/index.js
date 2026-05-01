require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Importar rutas de forma segura
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const paymentRoutes = require('./routes/payments');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/payments', paymentRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({
    message: "🚀 API Viajes-App v1.0",
    status: "online",
    domain: "https://viajes.jabezfl180.com"
  });
});

app.get('/health', (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en https://viajes.jabezfl180.com`);
});
