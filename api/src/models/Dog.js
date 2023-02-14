const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), 
      allowNull: false,
      //defaultValue: 1,
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      //defaultValue: 1,
    },
    life_span: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(500),
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  },

  },{
    timestamps: false
  });
};
