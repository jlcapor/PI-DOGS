const {
    getAllTemperaments,
    createTemperament
} = require('../controllers/temperamentsController');

const getAllTemperamentsHandler = async(req , res) =>{
    try {
        const temperaments = await getAllTemperaments();
        const createTemperaments = await createTemperament(temperaments)
        res.status(200).json(createTemperaments)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getAllTemperamentsHandler,
}