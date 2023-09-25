require("dotenv").config();
const { Sequelize } = require('sequelize');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, BDD} = process.env


const database = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${BDD}`,
    {logging:false}
)


const { Dog, Temperament } = sequelize.models;


module.exports = {
    ...database.models,
    database
};
