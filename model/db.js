const Sequelize = require('sequelize');
const sequelize = new Sequelize("user","manju","MANJU@1234",{
    dialect: "mysql",
   });

//Creating tables in Databse Using Sequelize Data
   const user_table =sequelize.define('user_table',{ 
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    confirm: Sequelize.STRING,
    role: Sequelize.STRING,
    },{tableName:"user_table"}); 
  
    user_table.sync();
  
   const user_task = sequelize.define('user_task',{
    userid: Sequelize.INTEGER,
    taskid: Sequelize.INTEGER,
  
   },{tableName:"user_task"});
  
     user_task.sync();
  
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

   const projects = sequelize.define('projects',{
    name: Sequelize.STRING,
    desc: Sequelize.STRING,
    status:Sequelize.STRING,
   },{tableName:"projects"});
      projects.sync();

   const labels = sequelize.define('labels',{
    labelname: Sequelize.STRING,
   },{tableName:"labels"});
     labels.sync();

   const categories = sequelize.define('categories',{
    categoriesName:Sequelize.STRING,
   },{tableName:"categories"});
     categories.sync();
   

   const user_login = sequelize.define('user_login',{
    email: Sequelize.STRING,
    password: Sequelize.STRING,
   },{tableName: "user_login"});

   user_login.sync();

   sequelize.authenticate().then(()=>{
    console.log('Connected Sucessfully')
   }).catch((err)=>console.log(err,'This has a error'));

   user_table.belongsToMany(tasks,{through: 'UserTask'});
   tasks.belongsToMany(user_table,{through: 'UserTask'});
   
   user_table.belongsToMany(projects,{through: 'User_projects'});
   projects.belongsToMany(user_table,{through: 'User_projects'});

//Relation Between Task and users 
       user_table.hasMany(tasks);
       tasks.belongsTo(user_table);
       tasks.belongsTo(projects);
       projects.belongsTo(categories);
       projects.belongsTo(labels);
  module.exports.user_table =user_table;
  module.exports.user_task =user_task;
  module.exports.tasks =tasks;
  module.exports.projects =projects;
  module.exports.labels =labels;
  module.exports.categories =categories;
  module.exports.user_login =user_login;