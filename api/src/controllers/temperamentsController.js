const axios = require('axios')
const { Temperament } = require('../db/DB_connection');

const {URL_BASE, API_KEY} = process.env;


const getAllTemperaments = async () => {
    const response = await axios.get(`${URL_BASE}/?api_key=${API_KEY}`);
    
    const infoTemperamentApi = response.data.map ((temp) => {
        const temperament = (temp.temperament || '').trim();
        return temperament.split(",").map(t => t.trim()).filter(Boolean); 
    });

    const orderTemperament = infoTemperamentApi.flat().sort();
    const temperaments = [...new Set(orderTemperament)];
    return temperaments
  
}


const createTemperament = async(temperaments) =>{
    temperaments.forEach(async (dog) => { 
      await Temperament.findOrCreate({
        where: { name: dog },
      });
    })
    const searchDb = await Temperament.findAll();
    return searchDb
}

module.exports = {
    getAllTemperaments,
    createTemperament
}