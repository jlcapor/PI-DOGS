const { Router } = require('express');
const dogRouter = require('./dogRouter');
const temperamentsRouter = require('./temperamentsRouter');

const mainRouter = Router();



mainRouter.use('/dogs', dogRouter);
mainRouter.use('/temperaments', temperamentsRouter);


module.exports = mainRouter