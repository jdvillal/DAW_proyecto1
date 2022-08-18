'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /*await queryInterface.bulkInsert('Usuarios', [{  
      nombre: 'Jorge', 
      apellido: 'Villalta',
      tipoUsuario: 1,
      username: 'usuario0',
      password: 'mypassword',
      fechaNacimiento: new Date('November 20, 1997'),
      fechaRegistro: new Date(),
      createdAt: new Date(),  
      updatedAt: new Date()  
  }]);
    for (let i = 0; i < 99; i++) {  
      await queryInterface.bulkInsert('Usuarios', [{  
          nombre: 'Nombre'+i, 
          apellido: 'Apellido'+i,
          tipoUsuario: 2,
          username: 'usuario'+i,
          password: 'mypassword',
          fechaNacimiento: new Date('December 17, 1995'),
          fechaRegistro: new Date(),
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

    //await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
