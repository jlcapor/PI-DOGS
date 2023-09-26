const { Router } = require('express');
const {   
    createDogBreedHandler,
    getAllDogBreedsHandler,
    getDogBreedDetailHandler
} = require('../handlers/dogsHandler');

const dogRouter = Router();


dogRouter.post("/", createDogBreedHandler);
dogRouter.get("/", getAllDogBreedsHandler);   
dogRouter.get("/:id", getDogBreedDetailHandler);

module.exports = dogRouter;