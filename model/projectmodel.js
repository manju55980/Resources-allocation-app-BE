const Sequelize = require('sequelize');
const sequelize = new Sequelize("user","manju","MANJU@1234",{
    dialect: "mysql",
   });

const projects = sequelize.define('projects',{
    name: Sequelize.STRING,
    desc: Sequelize.STRING,
    status:Sequelize.STRING,
   },{tableName:"projects"});
      projects.sync();

    module.exports.projects =projects;