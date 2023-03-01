const express = require('express')
const router = express.Router();

router.get('/alllabels',async(req,res)=>{
    const label = await labels.findAll();
    res.json(label);
   })

router.post('/addLabels',(req,res)=>{
    const labelname = req.body.labelname;
    const lb = labels.build({
      labelname
    })
    lb.save()
    res.send({'status':'label Posted'});
   })   

 module.exports = router;