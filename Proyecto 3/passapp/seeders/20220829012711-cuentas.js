'use strict';


let usuarios = ['user', 'cuenta', 'usuario', 'micuenta'];
let domains = ['correo', 'domain', 'example', 'me', 'mail', 'email', 'service', 'institution'];
let notas = ['cuenta personal', 'cuenta del trabajo', 'cuenta principal', 'cuenta secundaria'];
let passwords = ['contresena', 'mypassword', '12345678', 'qwerty123', 'password'];

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     for (let i = 2; i < 102; i++) {
      for(let j = 0; j < 10; j++){
        await queryInterface.bulkInsert('cuenta', [{
          correo: usuarios[Math.floor(Math.random() * 4)]+i+'@'+domains[Math.floor(Math.random() * 8)]+'.com',
          usuario: usuarios[Math.floor(Math.random() * 4)]+i,
          password: passwords[Math.floor(Math.random() * 5)],
          nota: notas[Math.floor(Math.random() * 4)],
          userID: i,
          servicioID: Math.floor(Math.random() * 15),
          createdAt: new Date(),  
          updatedAt: new Date()
      }], {});
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('cuenta', null, {});
  }
};
