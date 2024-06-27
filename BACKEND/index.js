const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const lifeExpectancyRoutes = require('./routes/lifeExpectancyRoutes');
const cityRoutes = require('./routes/cityRoutes');
const authRoutes = require('./routes/authRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config()


const app = express();
const PORT = 3000;

// Allow requests from all origins (adjust origin as per your frontend URL in production)
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});


app.use(cors(corsOptions));
app.use(helmet());// Security headers
app.use(limiter);
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/api/v1/life_expectancies', lifeExpectancyRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('API Life Expectancy');
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
