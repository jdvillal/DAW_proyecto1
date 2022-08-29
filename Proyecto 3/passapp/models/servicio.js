'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  servicio.init({
    nombre: DataTypes.STRING,
    siteURL: DataTypes.STRING,
    iconURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'servicio',
  });
  return servicio;
};