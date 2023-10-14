//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
const axios = require('axios');
const { Dog , Temperament} = require('../db/DB_connection');
const { Op } = require('sequelize');
const {URL_BASE, API_KEY} = process.env;


const createDogBreedDB = async ({name, height, weight, life_span, image, temperaments})=>{

    // const apiResponse = await axios.get(`${URL_BASE}/search?q=${name}&api_key=${API_KEY}`);
    const {data} = await axios.get(`${URL_BASE}/?api_key=${API_KEY}`);
    const dogFilter = data.filter((dogBreed) =>
        dogBreed.name.toLowerCase().includes(name.toLowerCase())
    );
    if (dogFilter.length > 0) throw new Error('The breed already exists in the external API')
    
    
    const existingDog  = await Dog.findOne({where: {name}})
    if(existingDog) throw new Error('The breed already exists in the database');
    
    const dogCreated = await Dog.create({name, height, weight, life_span, image});
    
    temperaments.forEach(async (temp) => {
        const temperamentsDB = await Temperament.findAll({
          where: { name: temp },
        });
        await dogCreated.addTemperament(temperamentsDB);
      });
    
    return dogCreated;
}

const dogBreedUpdateBD = async (id, { name, height, weight, life_span, image, temperaments }) => {
    
    const { data } = await axios.get(`${URL_BASE}/?api_key=${API_KEY}`);
    const dogFilter = data.filter((dogBreed) =>
        dogBreed.name.toLowerCase().includes(name.toLowerCase()) && dogBreed.id !== id
    );
    
    if (dogFilter.length > 0) {
        throw new Error('The breed already exists in the external API');
    }
    
    
    const existingDog = await Dog.findOne({ where: { name, id: { [Op.not]: id } } });
    if (existingDog) {
        throw new Error('The breed already exists in the database');
    }
    
    
    const [updatedRowCount] = await Dog.update(
        { name, height, weight, life_span, image },
        { where: { id } }
    );

    if (updatedRowCount === 0) {
        throw new Error(`There is no dog with id ${id}`);
    }

    const updatedDog = await Dog.findByPk(id, {
        include: [
            { 
                model: Temperament, 
                attributes: ['id'],
                through: { 
                    attributes: [] 
                } 
            }
        ]
    });
    
    const idsTemperamentsToUpdate = await Temperament.findAll({
        where: { name: temperaments },
        attributes: ['id'],
    });

    return await updatedDog.setTemperaments(idsTemperamentsToUpdate);
}








const deleteDogBreedBD = async (id)=>{
    return Dog.destroy({
        where:{ id }
    }).then((response)=>{
        if(response === 0){
            throw new Error("The dog could not be deleted or does not exist.");
        }
        return `Dog with id: ${id} deleted successfully.`
    })
    
}

const  getAllDogBreedsAPI = async() =>{
    const infoDogApi =  await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
    const dogBreedsAPI = infoDogApi.data.map(dogApi => {
        return{
            id: dogApi.id,
            name: dogApi.name,
            height: dogApi.height.metric,
            weight: dogApi.weight.metric,
            life_span: dogApi.life_span,
            temperament: dogApi.temperament,
            image: dogApi.image?.url || '',
            created: false,
        }
    })
    return dogBreedsAPI;
}

const getAllDogBreedsBD = async() =>{
    const infoDogBD = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    

    const dogBreedsBD = infoDogBD.map(dogBD => {
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

    return dogBreedsBD;
}

const getDogBreedByIdAPI = async(id) =>{
    const {data} = await axios.get(`${URL_BASE}/?api_key=${API_KEY}`);
    
    const [dogApi] = data.filter((dog) => dog.id == id);

    if (!dogApi) {
        throw new Error('The dog does not exist in the API');
    }
    const dogBreed = {
        id: dogApi.id,
        name: dogApi.name,
        height: dogApi.height.metric,
        weight: dogApi.weight.metric,
        life_span: dogApi.life_span,
        temperament: dogApi.temperament ? dogApi.temperament : 'Dog with no temperament',
        image: dogApi.image.url || '',
        created: false,
    };
    // const dogBreed = {
    //     id: dogBreedFilter[0].id,
    //     name: dogBreedFilter[0].name,
    //     height: dogBreedFilter[0].height.metric,
    //     weight: dogBreedFilter[0].weight.metric,
    //     life_span: dogBreedFilter[0].life_span,
    //     temperament: dogBreedFilter[0].temperament,
    //     image: dogBreedFilter[0].image.url,
    //     created: false,
    // };
    return dogBreed
}

const  getDogBreedByIdBD = async(id) =>{
    const dogBreedBD = await Dog.findAll({
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
    
    if (!dogBreedBD || dogBreedBD.length === 0) {
        throw new Error("The dog does not exist in the BD");
    }
   
    const infoDogBreedBD = dogBreedBD.map(dogBreed => {
        return {
         id: dogBreed.id,
         name: dogBreed.name,
         height: dogBreed.height,
         weight: dogBreed.weight,
         life_span: dogBreed.life_span,
         temperament: dogBreed.Temperaments.map(elemento => elemento.name).join(', '),  
         image: dogBreed.image,
         created: dogBreed.created
        }
    })
    
    return  infoDogBreedBD[0]
}

const searchDogBreedsInAPI = async(name) =>{
    const response = await axios.get(`${URL_BASE}/search?q=${name}&api_key=${API_KEY}`);
    const dogBreedsAPI = response.data.map(dogApi => {
        const image = dogApi.image ? dogApi.image.url : ''; 
        return {
            id: dogApi.id,
            name: dogApi.name,
            height: dogApi.height.metric,
            weight: dogApi.weight.metric,
            life_span: dogApi.life_span,
            temperament: dogApi.temperament,
            image,
            created: false,
        }
    })
    return dogBreedsAPI;
}

const searchDogBreedsInDB = async(name) =>{
    const dogBreedBD = await Dog.findAll({
        where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
        },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        },
        attributes: ['id', 'name', 'height', 'weight', 'life_span', 'image', 'created'],
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
     });

     return dogBreedsBD;
}





module.exports = {
    createDogBreedDB,
    dogBreedUpdateBD,
    deleteDogBreedBD,
    getDogBreedByIdAPI,
    getDogBreedByIdBD,
    getAllDogBreedsAPI,
    getAllDogBreedsBD,
    searchDogBreedsInAPI,
    searchDogBreedsInDB
}