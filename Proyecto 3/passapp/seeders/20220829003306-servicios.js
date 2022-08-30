'use strict';

let servicios = [
  {nombre: 'Apple', siteURL:'https://www.icloud.com/', iconURL:'http://192.168.100.11:3000/api/icons/Apple'},
  {nombre: 'Facebook', siteURL:'https://www.facebook.com/', iconURL:'http://192.168.100.11:3000/api/icons/Facebook'},
  {nombre: 'Google', siteURL:'https://accounts.google.com/', iconURL:'http://192.168.100.11:3000/api/icons/Google'},
  {nombre: 'Microsoft', siteURL:'https://login.live.com/', iconURL:'http://192.168.100.11:3000/api/icons/Microsoft'},
  {nombre: 'Reddit', siteURL:'https://www.reddit.com/', iconURL:'http://192.168.100.11:3000/api/icons/Reddit'},
  {nombre: 'Linkedin', siteURL:'https://www.linkedin.com/', iconURL:'http://192.168.100.11:3000/api/icons/Linkedin'},
  {nombre: 'Twitter', siteURL:'https://twitter.com/', iconURL:'http://192.168.100.11:3000/api/icons/Twitter'},
  {nombre: 'TikTok', siteURL:'https://www.tiktok.com/', iconURL:'http://192.168.100.11:3000/api/icons/TikTok'},
  {nombre: 'Pinterest', siteURL:'https://www.pinterest.com/', iconURL:'http://192.168.100.11:3000/api/icons/Pinterest'},
  {nombre: 'SnapChat', siteURL:'https://www.snapchat.com/', iconURL:'http://192.168.100.11:3000/api/icons/SnapChat'},
  {nombre: 'Instagram', siteURL:'https://www.instagram.com/', iconURL:'http://192.168.100.11:3000/api/icons/Instagram'},
  {nombre: 'Netflix', siteURL:'https://www.netflix.com', iconURL:'http://192.168.100.11:3000/api/icons/Netflix'},
  {nombre: 'DisneyPlus', siteURL:'https://www.disneyplus.com/login', iconURL:'http://192.168.100.11:3000/api/icons/DisneyPlus'},
  {nombre: 'HBO-Max', siteURL:'https://play.hbomax.com/signIn', iconURL:'http://192.168.100.11:3000/api/icons/HBO-Max'},
  {nombre: 'Hulu', siteURL:'https://auth.hulu.com/web/login', iconURL:'http://192.168.100.11:3000/api/icons/Hulu'}

]

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
    for (let i = 0; i < servicios.length; i++) {  
      await queryInterface.bulkInsert('servicios', [{
          nombre: servicios[i].nombre,
          siteURL: servicios[i].siteURL,
          iconURL: servicios[i].iconURL,
          createdAt: new Date(),  
          updatedAt: new Date()  
      }], {});
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('servicios', null, {});
  }
};
