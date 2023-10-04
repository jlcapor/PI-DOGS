const { Router } = require('express');
const {
    getAllTemperamentsHandler,
} = require('../handlers/temperamentsHandler')

const temperamentsRouter = Router();

temperamentsRouter.get('/', getAllTemperamentsHandler);

module.exports = temperamentsRouter;