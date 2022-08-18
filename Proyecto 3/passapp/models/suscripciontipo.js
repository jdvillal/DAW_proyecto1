'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuscripcionTipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SuscripcionTipo.init({
    descripcion: DataTypes.STRING,
    periodoMeses: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SuscripcionTipo',
  });
  return SuscripcionTipo;
};