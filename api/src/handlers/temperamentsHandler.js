const {
    getAllTemperaments,
    createTemperament
} = require('../controllers/temperamentsController');

const getAllTemperamentsHandler = (req , res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createTemperamentHandler = (req , res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getAllTemperamentsHandler,
    createTemperamentHandler
}