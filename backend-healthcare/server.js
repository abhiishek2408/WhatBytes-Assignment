require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models');
const errorHandler = require('./utils/errorHandler');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const mappingRoutes = require('./routes/mappings');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.json({ message: 'Healthcare backend (Node.js + Express + PostgreSQL)' }));


app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');


    await sequelize.sync({ alter: true });
    console.log('Models synchronized.');

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
})();
