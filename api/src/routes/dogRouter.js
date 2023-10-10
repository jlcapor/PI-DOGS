const { Router } = require('express');
const {   
    getAllDogBreedsHandler,
    getDogBreedDetailHandler,
    createDogBreedHandler,
    deleteDogBreedHandler,
} = require('../handlers/dogsHandler');

const dogRouter = Router();


dogRouter
.route('/')
.get(getAllDogBreedsHandler)
.post(createDogBreedHandler)

dogRouter
.route('/:id')
.get(getDogBreedDetailHandler)
.delete(deleteDogBreedHandler)

module.exports = dogRouter;