require("dotenv").config();
const { Sequelize } = require('sequelize');
const DogModel = require('./models/Dog');
const TemperamentModel = require('./models/Temperament')


const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, BDD} = process.env


const database = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${BDD}`,
    {logging:false}
)


// DEFINICION DE MODELOS A USAR
DogModel(database);
TemperamentModel(database);

//Crear las relaciones // asociaciones
const {Dog, Temperament} = database.models


Dog.belongsToMany(Temperament, { through: 'dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });

module.exports = {
    ...database.models,
    database
};
