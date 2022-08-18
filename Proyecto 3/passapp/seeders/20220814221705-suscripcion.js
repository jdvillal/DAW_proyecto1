'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     
     for (let i = 2; i <101; i++) {  
      await queryInterface.bulkInsert('Suscripcions', [{  
          suscripcionTipo: Math.floor(Math.random() * 3) + 1,
          fechaInicio: new Date(),
          usuarioID: i,
          createdAt: new Date(),  
          updatedAt: new Date()  
      }], {});  
   }*/
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     //await queryInterface.bulkDelete('Suscripcions', null, {});
  }
};
