const { 
    createDogBreedDB,
    getDogBreedByIdAPI,
    getDogBreedByIdBD,
    getAllDogBreedsAPI,
    getAllDogBreedsBD,
    searchDogBreedsInAPI,
    searchDogBreedsInInDB,
} = require('../controllers/dogsController');


const getAllDogBreedsHandler = async(req , res)=>{
    const { name } = req.query;
    try {
        if(name){
            [apiResults, dbResults] = await Promise.all([
                searchDogBreedsInAPI(name),
                searchDogBreedsInInDB(name),
            ]);
            const searchDogBreeds = [...apiResults, ...(dbResults || [])];
            res.status(200).json(searchDogBreeds)
        }else{
            const [dogBreedsBD, dogBreedsAPI] = await Promise.all([
                getAllDogBreedsBD(),
                getAllDogBreedsAPI()
            ])
            const allDogBreeds = [...dogBreedsBD, ...dogBreedsAPI]
            res.status(200).json(allDogBreeds)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const getDogBreedDetailHandler = async(req, res) =>{
    const {id} = req.params  
    try {
        const dogBreedDetail = isNaN(id) 
        ? await getDogBreedByIdBD(id) 
        : await getDogBreedByIdAPI(id)
        res.status(200).json(dogBreedDetail);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const createDogBreedHandler = async(req, res)=>{
    const {name, height, weight, life_span, image, temperament} = req.body
    try {
        const dogCreated = await createDogBreedDB({name, height, weight, life_span, image, temperament})
        res.status(200).json(dogCreated);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getAllDogBreedsHandler,
    createDogBreedHandler,
    getDogBreedDetailHandler
}

