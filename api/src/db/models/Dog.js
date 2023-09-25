const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (database) => {
  // defino el modelo
  database.define('Dog', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height:{
        type: DataTypes.JSON,
        allowNull: false
    },
    weight: {
        type: DataTypes.JSON,
        allowNull: false
    },
    life_span:{
        type : DataTypes.STRING,
        allowNull: false
    },
    image:{
        type : DataTypes.STRING,
        allowNull: false,
    },
  },
    {timestamps: false}
  );
};
