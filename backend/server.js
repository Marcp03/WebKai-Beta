const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
require('dotenv').config();
;
;

const app = express();
;
;

app.use(cors({
  origin: 'https://webkai-2.onrender.com',
  credentials: true
}));
app.use(express.json());
;
;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
;
;

// Health check
app.get('/', (req, res) => {
  res.send('Observatorio KAI+ backend funcionando');
});
;
;

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
