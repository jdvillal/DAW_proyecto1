'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sesionesUsuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sesionesUsuarios.init({
    userID: DataTypes.INTEGER,
    sessionHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sesionesUsuarios',
  });
  return sesionesUsuarios;
};