const Sequelize = require('sequelize');
const sequelize = new Sequelize("user","manju","MANJU@1234",{
    dialect: "mysql",
   });

 const tasks = sequelize.define('tasks',{
    taskurl: Sequelize.STRING,
    startdate: Sequelize.DATEONLY,
    enddate: Sequelize.DATEONLY,
    starttime: Sequelize.TIME,
    endtime: Sequelize.TIME,
    status: Sequelize.STRING,
    setPriority: Sequelize.STRING,
   },{tableName:"tasks"});
  
    tasks.sync();
module.exports.tasks =tasks;