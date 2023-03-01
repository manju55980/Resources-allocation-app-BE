const express = require('express')
const router = express.Router();

router.post('/addProjects',(req,res)=>{
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


router.get('/allProjects',async(req,res)=>{
    const fetch = await projects.findAll()
    res.json(fetch);
   })
   
   
router.get('/projectbyid/:id',async(req,res)=>{
    const get = await projects.findAll({
    where:{
      id:req.params.id,
    },
    })
    res.json(get);
   })
router.put('/editproject/:id',(req,res)=>{
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
  })

  router.post('/addProjectId', async(req,res)=>{
    try{
      const{  projectId,userTableId, } = req.body;
      const record = userTableId.map(userTableId=>({userTableId,projectId}));
       await user_projects.bulkCreate(record)
      
      res.send({'status':'Id Posted'});
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  })
module.exports = router;