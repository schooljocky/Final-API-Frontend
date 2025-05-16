// required modules //
var express = require('express');
var path = require('path');
var app = express();
const mongoose = require('mongoose');
const vhsRoutes = require('./routes/vhs');
const vhsAPI = require('./routes/api/api-vhs');

// Set up view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB Atlas //
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.n4jfakx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log("Database connected!"))
    .catch(err => console.error(`Database connection error: ${err}`));

// point / to public folder //
app.use('/', express.static('public'));
app.use('/', vhsRoutes);
app.use('/vhs/api/v1', vhsAPI);

// setup for module use //
module.exports = app;
