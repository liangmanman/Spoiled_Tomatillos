'use strict';
module.exports = function (app) {
    const express = require('express');

    const apiRouter = express.Router();
    app.use('/api', apiRouter);

    apiRouter.get('/hello', async function(req, res) {
        res.send('Hello World');
    });

    // user router
    const userRouter =require('./users');
    apiRouter.use('/users', userRouter);

    // profile router
    const profileRouter = require('./profiles');
    apiRouter.use('/profiles', profileRouter);

    // movie router
    const movieRouter = require('./movies');
    apiRouter.use('/movies', movieRouter);

    // like router
    const likeRouter = require('./likes');
    apiRouter.use('/likes', likeRouter);

};