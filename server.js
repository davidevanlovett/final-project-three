require('dotenv').config();

// Configuration check.
// Disable this at your own risk
require('./utils/verifyConfiguration')();

// Requiring necessary npm packages
const express = require('express');
const path = require('path');
// Requiring our routes
const routes = require('./controllers');
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 5000;
const db = require('./models');
// Bringing in Morgan, a nice logger for our server
const morgan = require('morgan');
// Compression
const compression = require('compression');
// Creating express app
const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
// enable compression middleware
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
// Add all our backend routes
app.use(routes);
// Send all other requests to react app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log(`Server now on port ${PORT}!`);
    });
});