const express = require('express');
const ExpressError = require('./expressError');
const listRoutes = require('./listRoutes');

const app = express();

app.use(express.json());

app.use('/list', listRoutes);

app.use((error, req, res, next) => {
    const err = new ExpressError('Not Found', 404);
    return next(err);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    return res.json({
        message: error.message,
        error: error
    });
})

module.exports = app;