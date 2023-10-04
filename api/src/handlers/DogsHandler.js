const { 
    createDogBreedDB,
    getDogBreedByIdAPI,
    getDogBreedByIdBD,
    getAllDogBreedsAPI,
    getAllDogBreedsBD,
    searchDogBreedsInAPI,
    searchDogBreedsInDB,
} = require('../controllers/dogsController');


const getAllDogBreedsHandler = async(req , res)=>{
    const { name } = req.query;

    try {
        if(name){
            const [apiResults, dbResults] = await Promise.all([
                searchDogBreedsInDB(name.toLowerCase()),
                searchDogBreedsInAPI(name.toLowerCase())
            ]);
            const searchDogBreeds = [...apiResults, ...(dbResults || [])];
            res.status(200).json(searchDogBreeds);
        }else{
            const allDogBreeds = await Promise.all([
                getAllDogBreedsBD(),
                getAllDogBreedsAPI()
            ]).then(([dogBreedsBD, dogBreedsAPI]) => [...(dogBreedsBD || []), ...dogBreedsAPI]);
    
            res.status(200).json(allDogBreeds);
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
    const {name, height, weight, life_span, image, temperaments} = req.body
    try {
        const dogCreated = await createDogBreedDB({name, height, weight, life_span, image, temperaments})
        res.status(200).json(dogCreated);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getAllDogBreedsHandler,
    createDogBreedHandler,
    getDogBreedDetailHandler,
}

