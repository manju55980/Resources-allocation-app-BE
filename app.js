const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv/config')
const app = express()
const bodyParser= require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const port = process.env.PORT || 3000;

const Sequelize = require('sequelize');
const sequelize = new Sequelize("user","manju",process.env.Db_Connection,{
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
   
   const usertask= sequelize.define('usertask',{})
   user_table.belongsToMany(tasks,{through: 'usertask'});
   tasks.belongsToMany(user_table,{through: 'usertask'});
   
   const user_projects = sequelize.define('user_projects',{})
   user_table.belongsToMany(projects,{through: 'user_projects'});
   projects.belongsToMany(user_table,{through: 'user_projects'});

//Relation Between Task and users 
       user_table.hasMany(tasks);
       tasks.belongsTo(user_table);
       tasks.belongsTo(projects);
       projects.belongsTo(categories);
       projects.belongsTo(labels);
 
      //  const newUserproject = {};

      //  // Find the user by id
      //  User.findByPk(userId)
      //    .then(user => {
      //      newUserproject.userId = user.id;
      //      // Find the project by id
      //      return projects.findByPk(projectId);
      //    })
      //    .then(project => {
      //      newUserproject.projectId = project.id;
      //      // Create the new userproject with the associated user and project
      //      return Userproject.create(newUserproject);
      //    })
      //    .then(userproject => {
      //      console.log(userproject);
      //    })
      //    .catch(err => {
      //      console.log(err);
      //    });

// const postTask = require('./routes/tasks');
//const postuser = require('./routes/user')
// const postProject = require('./routes/projects')
// const postCategories = require('./routes/category')
// const postlabel = require('./routes/label')
// // app.use('/',postTask);
// //app.use('/',postuser)
// app.use('/',postProject)
// app.use('/',postCategories)
// app.use('/',postlabel)
//Api for All Operations such as Update,Delete,Create, 



app.post('/addCategories',(req,res)=>{
const categoriesName = req.body.categoriesName;
const cat = categories.build({
  categoriesName
})
cat.save()
res.send({'status':'Categories Posted'});
})
 app.post('/addLabels',(req,res)=>{
  const labelname = req.body.labelname;
  const lb = labels.build({
    labelname
  })
  lb.save()
  res.send({'status':'label Posted'});
 })

 app.post('/addProjects',(req,res)=>{
   const name = req.body.name;
   const desc = req.body.desc;
   const labelId = req.body.labelId;
   const categoryId = req.body.categoryId;
   const status = req.body.status;
   const dk = projects.build({
     name,
     desc,
     labelId,
     categoryId,
     status,
   })
   dk.save()
   res.send({'status':'project Posted'});
 })
 app.get('/allProjects',async(req,res)=>{
  const fetch = await projects.findAll()
  res.json(fetch);
 })
 app.get('/projectbyid/:id',async(req,res)=>{
  const get = await projects.findAll({
  where:{
    id:req.params.id,
  },
  })
  res.json(get);
 })

 app.get('/alllabels',async(req,res)=>{
  const label = await labels.findAll();
  res.json(label);
 })
 app.get('/allcategories',async(req,res)=>{
  const cat = await categories.findAll();
  res.json(cat);
 })
   app.get('/fetchbyid1',async(req,res)=>{
    const fetch = await user_table.findByPk('1');
    res.send(fetch);
   })
   app.get('/allTasks',async(req,res)=>{
    const fetch =  await tasks.findAll()
    res.json(fetch);
   })

app.get('/usertask',async(req,res)=>{
  const  usertask = await user_task.findAll();
  res.json(usertask);
});

app.post('/postUserTask',(req,res)=>{
  const userid = req.body.userid;
  const taskid = req.body.taskid;
  const usertask = user_task.build({
    userid,
    taskid,
  });
  usertask.save()
  res.send('Data Saved');
});



 
app.get('/', (req, res) => {
    res.send('Welcome to Node API');
})

app.get('/userLogin',async(req,res)=>{
  const alluser = await user_login.findAll();
  res.json(alluser);
})


// app.get('/getTaskData', async(req, res) => {
//     const alltask = await tasks.findAll();
// })

app.post('/addProjectId', async(req,res)=>{
  try{
    const{  projectId,userTableId, } = req.body;
    const record = userTableId.map(userTableId=>({userTableId,projectId}));
     await user_projects.bulkCreate(record)
    
    res.send({'status':'Id Posted'});
  } catch(err){
    res.status(500).json({ message: err.message });
  }
})

app.post('/addMultipletask',async(req,res)=>{
  try{
    const {userTableId,taskId}= req.body;
    const data = userTableId.map((userTableId)=>({userTableId,taskId}));
    await usertask.bulkCreate(data);
    res.send({'status':'Id Posted'});
  } catch(err){
    res.status(500).json({message:err.message})
  }
})
 
// app.get('/getuserProject/:id', async(req,res)=>{
//   const projectId = req.params.id;
//   const users = user_table.findByPk(projectId,{
//   include:[
//     {
//       model: user_table,
//       through: {firstname:[]},
//     },
//   ]
//  })
//  res.json(users);
// })



app.delete('/deletetasks/:id',(req,res)=>{
  tasks.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send({'status':'Task Deleted'});
  res.redirect("/");
})
app.get('/userbyid/:id',async(req,res)=>{
const user = await user_table.findAll({
  where: {
    id: req.params.id,
  },
})
res.json(user);
})

app.get('/getbyid/:id',async(req,res)=>{
  const all = await tasks.findAll({
    where: {
      id: req.params.id,
    },
  })
  res.json(all);
})
app.get('/projectTask/:id',async(req,res)=>{
  const task = await tasks.findAll({
    where:{
      projectId: req.params.id,
    },
  })
  res.json(task);
})

app.get('/getusertask/:id',async(req,res)=>{
  const all = await tasks.findAll({
    where: {                                            
      userTableId: req.params.id,
    },
  })
  res.json(all);
})

app.post('/postTaskData', (req, res) => {
  const taskurl = req.body.taskurl;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  const status = req.body.status;
  const setPriority = req.body.setPriority;
  const userTableId = req.body.userTableId;
  const projectId = req.body.projectId;
  const tk = tasks.build({
      taskurl,
      startdate,
      enddate,
      starttime,
      endtime,
      status,
      setPriority,
      userTableId,
      projectId,
  })
  tk.save();
  res.send({'status':'Task Posted'});
})

app.put("/EditTask/:id",(req,res)=>{
  const taskurl = req.body.taskurl;
    const startdate = req.body.startdate; 
    const enddate = req.body.enddate;
    const starttime = req.body.starttime;
    const endtime = req.body.endtime;
    const status = req.body.status;
    const setPriority = req.body.setPriority;
    const userTableId = req.body.userTableId;
    const projectId = req.body.projectId;
    tasks.update({
      taskurl:taskurl,
      startdate:startdate,
      enddate:enddate,
      starttime:starttime,
      endtime:endtime,
      status:status,
      setPriority:setPriority,
      userTableId:userTableId,
      projectId:projectId
    },{
      where:
      {
      id: req.params.id,
    },
  }
    );
    res.send({'status':'task Edited'});
});
app.put('/editproject/:id', (req,res)=>{
  const name = req.body.name;
   const desc = req.body.desc;
   const labelId = req.body.labelId;
   const categoryId = req.body.categoryId;
   const status = req.body.status;
   projects.update({
    name:name,
    desc:desc,
    labelId:labelId,
    categoryId:categoryId,
    status:status,
   },{
    where:
    {
      id: req.params.id,
    },
   });
   res.send({'status':'project Edited'});
});


app.get('/getUserData',async(req, res) => {
    const alldata = await user_table.findAll()
    res.json(alldata);
})

app.post('/postUserData', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confirm = req.body.confirm;
    const role = req.body.role;
    const userdata = user_table.build({
      firstname,
      lastname,
      email,
      password,
      confirm,
      role,
    })
    userdata.save();
    res.send({'status':'User Posted'});
})
// sequelize.sync({force:true});
//Hosting The Application
app.listen(port, () => console.log(`app listening on port ${port}!`));