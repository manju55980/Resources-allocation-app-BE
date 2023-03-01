
const express = require('express')

const router = express.Router();


router.post('/postUserData', (req, res) => {
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

router.get('/userbyid/:id',async(req,res)=>{
  const user = await user_table.findAll({
    where: {
      id: req.params.id,
    },
  })
  res.json(user);
  })

module.exports = router;