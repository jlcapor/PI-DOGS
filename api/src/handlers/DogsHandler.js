const { 
    createDogBreedDB,
    dogBreedUpdateBD,
    deleteDogBreedBD,
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
            const [dbResults, apiResults] = await Promise.all([
                searchDogBreedsInDB(name.toLowerCase()),
                searchDogBreedsInAPI(name.toLowerCase())
            ]);
            const searchDogBreeds = [...dbResults, ...apiResults,];
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

const putDogBreedHandler =  async(req, res) =>{
    const { id } = req.params;
    const { name, height, weight, life_span, image, temperaments } = req.body
    try {
        const dogUpdate = await dogBreedUpdateBD(id, {name, height, weight, life_span, image, temperaments})
        res.status(200).json(dogUpdate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteDogBreedHandler = async(req, res) =>{
    try {
        const { id } = req.params;
        const response = await deleteDogBreedBD(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getAllDogBreedsHandler,
    getDogBreedDetailHandler,
    createDogBreedHandler,
    putDogBreedHandler,
    deleteDogBreedHandler
}

