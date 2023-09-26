const axios = require('axios')
const { Temperament } = require('../db/DB_connection');

const {URL_BASE, API_KEY} = process.env;


const getAllTemperaments = async () => {
    const {data} = await axios.get(`${URL_BASE}/?api_key=${API_KEY}`);
}


const createTemperament = async() =>{}

module.exports = {
    getAllTemperaments,
    createTemperament
}