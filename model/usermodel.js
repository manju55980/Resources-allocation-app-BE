const Sequelize = require('sequelize');
const sequelize = new Sequelize("user","manju","MANJU@1234",{
    dialect: "mysql",
   });


   const user_table =sequelize.define('user_table',{ 
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    confirm: Sequelize.STRING,
    role: Sequelize.STRING,
    },{tableName:"user_table"}); 
  
    user_table.sync();

    module.exports.user_table =user_table;