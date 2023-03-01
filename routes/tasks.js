const express = require('express');

const router = express.Router();
const tasks = require('../model/taskmodel')

router.post('/postTaskData', (req, res) => {
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
app.post('/usertaskudmultiplepost',async(req,res)=>{
  try{
    const { taskurl,startdate,enddate,starttime,endtime,status,setPriority,userids,projectId}= req.body;
    const task = await tasks.create({taskurl,startdate,enddate,starttime,endtime,status,setPriority,projectId});
    await Promise.all(userids.map(async userTableId=> await usertask.Create({taskId: task.id,userTableId})));
    res.send(200).json({message: 'Task created sucessfully'});
  
  }catch(error){
    res.send(500).json({message:'Error creating task'})
  }
   })
  
router.delete('/deletetasks/:id',(req,res)=>{
    tasks.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({'status':'Task Deleted'});
    res.redirect("/");
  })

  
router.get('/getbyid/:id',async(req,res)=>{
    const all = await tasks.findAll({
      where: {
        id: req.params.id,
      },
    })
    res.json(all);
  })
  
router.get('/getusertask/:id',async(req,res)=>{
    const all = await tasks.findAll({
      where: {                                            
        userTableId: req.params.id,
      },
    })
    res.json(all);
  })
router.put("/EditTask/:id",(req,res)=>{
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
 module.exports = router;