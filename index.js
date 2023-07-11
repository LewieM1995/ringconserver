//import modules

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const pool = require('./database');

//const corsOptions = require('Cmiddlewares\cors.js');


//app
const app = express();
app.use(express.json());

//porting 
const port = process.env.PORT || 8080;

//routes
//const Routes = require('./routes/data');


//db


pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
  
    console.log('Connected to RingData');
  
    // Set up your routes and middleware here
    const Routes = require('./routes/data');
  
    // Use the connection in your routes or controllers
    app.use((req, res, next) => {
      req.socket = connection;
      next();
    });
  
    // Use your routes
    app.use('/', Routes);
  
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
  


//middleware
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());


//listener




