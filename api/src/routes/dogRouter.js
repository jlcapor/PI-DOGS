const { Router } = require('express');
const { getDogsApiHandler } = require('../handlers/DogsHandler');

const dogRouter = Router();

dogRouter.get("/", getDogsApiHandler)

module.exports = dogRouter;