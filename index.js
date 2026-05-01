require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

console.log("🚀 Iniciando Viajes App Backend...");

// Ruta básica
app.get('/', (req, res) => {
  res.json({
    message: "🚀 API Viajes-App v1.0",
    status: "online"
  });
});

// Importar rutas
const authRoutes = require('./src/routes/auth');
const tripRoutes = require('./src/routes/trips');

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
