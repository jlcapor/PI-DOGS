const { Router } = require('express');
const {
    getAllTemperamentsHandler,
    createTemperamentHandler
} = require('../handlers/temperamentsHandler')

const temperamentsRouter = Router();

temperamentsRouter.get('/', getAllTemperamentsHandler);
temperamentsRouter.post('/', createTemperamentHandler);

module.exports = temperamentsRouter;