//import modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
require('dotenv').config();
const pool = require('./database');


//Express app
const app = express();
app.use(express.json());



//middleware + CORS
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

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

    // Use the connection in routes or controllers
    /*app.use((req, res, next) => {
      req.dbConnection = connection;
      next();
    });*/
  
    // Use your routes
    app.use('/', Routes);

    /* const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/policeappserver.duckdns.org/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/policeappserver.duckdns.org/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/policeappserver.duckdns.org/chain.pem'),
  }; */

    const server = http.createServer(/*options,*/ app);

    //porting 
    const port = process.env.PORT || 4000;
  
    // Start the server/listen
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
  





