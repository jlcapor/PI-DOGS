const { Router } = require('express');
const {   
    createDogBreedHandler,
    getAllDogBreedsHandler,
    getDogBreedDetailHandler,
} = require('../handlers/dogsHandler');

const dogRouter = Router();


dogRouter
.route('/')
.get(getAllDogBreedsHandler)
.post(createDogBreedHandler)

dogRouter
.route('/:id')
.get(getDogBreedDetailHandler)
.put()
.delete()

module.exports = dogRouter;