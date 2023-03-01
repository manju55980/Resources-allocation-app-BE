const Sequelize = require('sequelize');
const sequelize = new Sequelize("user","manju","MANJU@1234",{
    dialect: "mysql",
   });

const categories = sequelize.define('categories',{
    categoriesName:Sequelize.STRING,
   },{tableName:"categories"});
     categories.sync();

module.exports.categories =categories;