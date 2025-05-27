const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
require('dotenv').config();
&nbsp;
&nbsp;

const app = express();
&nbsp;
&nbsp;

app.use(cors());
app.use(express.json());
&nbsp;
&nbsp;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
&nbsp;
&nbsp;

// Health check
app.get('/', (req, res) => {
  res.send('Observatorio KAI+ backend funcionando');
});
&nbsp;
&nbsp;

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
