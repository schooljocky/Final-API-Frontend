// required modules //
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const vhsRoutes = require('./routes/vhs');
const vhsAPI = require('./routes/api/api-vhs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB Atlas //
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.n4jfakx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log("Database connected!"))
    .catch(err => console.error(`Database connection error: ${err}`));

// API Routes //
app.use('/vhs/api/v1', vhsAPI);
app.use('/', vhsRoutes); 

// Serve Angular static files //
app.use(express.static(path.join(__dirname, './public/dist/frontend/browser')));

// Angular route //
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist/frontend/browser/index.html'));
});

// setup for module use //
module.exports = app;