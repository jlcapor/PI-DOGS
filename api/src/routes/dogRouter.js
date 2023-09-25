const { Router } = require('express');
const { getDogsApiHandler } = require('../handlers/dogsHandler');

const dogRouter = Router();

dogRouter.get("/", getDogsApiHandler)

module.exports = dogRouter;