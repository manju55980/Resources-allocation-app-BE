const express = require('express')
const router = express.Router();

router.post('/addCategories',(req,res)=>{
    const categoriesName = req.body.categoriesName;
    const cat = categories.build({
      categoriesName
    })
    cat.save()
    res.send({'status':'Categories Posted'});
    })


router.get('/allcategories',async(req,res)=>{
        const cat = await categories.findAll();
        res.json(cat);
       })    
module.exports = router;
      

