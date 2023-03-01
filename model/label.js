const Sequelize = require('sequelize');
const sequelize = new Sequelize("user","manju","MANJU@1234",{
    dialect: "mysql",
   });

   const labels = sequelize.define('labels',{
    labelname: Sequelize.STRING,
   },{tableName:"labels"});
     labels.sync();

     module.exports.labels =labels;