const router = require('express').Router()
const User = require('../models/user.model')



router.route('/verify').post((req, res) => {

    let query = { email: req.body.email }
    const isActive = req.body.code

    User.findOne(query, (err, prvUser) => {
        if (err || prvUser === null) {
            return res.send({ message: 'Account not Found' })
        } else if (prvUser.secretToken !== req.body.code){
            return res.send({message : 'Incorrect Code'})
        }else {
            User.findOneAndUpdate(query, { isActive: true }, (err) => {
                if (!err) {
                   return res.send({ message: 'User Verified' })
                }else {
                    return res.send({message : 'Err' + err})
                }
            })
        }
    })

})




module.exports = router