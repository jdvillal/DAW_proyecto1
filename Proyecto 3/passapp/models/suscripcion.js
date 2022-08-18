'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suscripcion.init({
    suscripcionTipo: DataTypes.INTEGER,
    fechaInicio: DataTypes.DATE,
    usuarioID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Suscripcion',
  });
  return Suscripcion;
};