const axios = require('axios')
const { Dog , Temperament} = require('../db/DB_connection');
const { Op } = require('sequelize');
const {URL_BASE, API_KEY} = process.env


const createDogBreedDB = async ({name, height, weight, life_span, image, temperament})=>{
    const dogCreated = await Dog.create({name, height, weight, life_span, image});
    dogCreated.addTemperament(temperament);
    return dogCreated;
}


const getDogBreedByIdAPI = async(id) =>{
    const {data} = await axios.get(`${URL_BASE}/?api_key=${API_KEY}`);
    
    const dogBreedFilter = data.filter(dog => dog.id == id)
    .map((dogBreed)=>{
        return{
            id: dogBreed.id,
            name: dogBreed.name,
            height: dogBreed.height.metric,
            weight: dogBreed.weight.metric,
            life_span: dogBreed.life_span,
            temperament: dogBreed.temperament,
            image: dogBreed.image.url,
        }
    })
    return dogBreedFilter[0]
}


const  getDogBreedByIdBD = async(id) =>{
    let dogBreedBD = await Dog.findAll({
        where: {
            id: id
        },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    
    dogBreedBD = dogBreedBD.map(dogBreed => {
        return {
         id: dogBreed.id,
         name: dogBreed.name,
         height: dogBreed.height,
         weight: dogBreed.weight,
         lifeSpan: dogBreed.life_span,
         temperament: dogBreed.Temperaments.map(elemento => elemento.name).join(', '),  
         image: dogBreed.image
        }
     })
     
    return  dogBreedBD[0]
}


const getAllDogBreeds = async () =>{

    const infoDogBD = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

    const infoDogApi =  await axios.get(`${URL_BASE}?api_key=${API_KEY}`);

    const dogBreedsBD = infoDogBD.map(dogBD => {
       return {
        id: dogBD.id,
        name: dogBD.name,
        height: dogBD.height,
        weight: dogBD.weight,
        lifeSpan: dogBD.life_span,
        temperament: dogBD.Temperaments.map(elemento => elemento.name).join(', '),    //.toString()
        image: dogBD.image,
        created: dogBD.created
       }
    })

    const dogBreedsAPI = infoDogApi.data.map(dogApi => {
        return{
            id: dogApi.id,
            name: dogApi.name,
            height: dogApi.height.metric,
            weight: dogApi.weight.metric,
            life_span: dogApi.life_span,
            temperament: dogApi.temperament,
            image: dogApi.image.url,
            created: false,
        }
    })

    return [...dogBreedsBD, ...dogBreedsAPI]
}


const getDogBreedsByName = async(name) =>{
    const dogBreedFilterAPI = await axios.get(`${URL_BASE}/search?q=${name}&api_key=${API_KEY}`);
    const dogBreedBD = await Dog.findAll({
        name:{
            [Op.iLike]: `%${name}%`
        },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })

    const dogBreedsBD = dogBreedBD.map(dogBD => {
        return {
         id: dogBD.id,
         name: dogBD.name,
         height: dogBD.height,
         weight: dogBD.weight,
         life_span: dogBD.life_span,
         temperament: dogBD.Temperaments.map(elemento => elemento.name).join(', '),    //.toString()
         image: dogBD.image,
         created: dogBD.created
        }
     })

     const dogBreedsAPI = dogBreedFilterAPI.data.map(dogApi => {
        return{
            id: dogApi.id,
            name: dogApi.name,
            height: dogApi.height.metric,
            weight: dogApi.weight.metric,
            life_span: dogApi.life_span,
            temperament: dogApi.temperament,
            image: dogApi.image.url,
            created: false,
        }
    })
    return [...dogBreedsAPI, ...dogBreedsBD]
}


// const infoClearAPI = (array)=>{ 
//     return array.map((dogBreed)=>{
//         return{
//             name: dogBreed.name,
//             height: dogBreed.height.metric,
//             weight: dogBreed.weight.metric,
//             life_span: dogBreed.life_span,
//             temperament: dogBreed.temperament,
//             image: dogBreed.image.url,
//             created:false
//         }
//     });
// };

 
module.exports = {
    createDogBreedDB,
    getDogBreedByIdAPI,
    getDogBreedByIdBD,
    getAllDogBreeds,
    getDogBreedsByName,
}