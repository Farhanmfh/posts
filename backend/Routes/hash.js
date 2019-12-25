const router = require('express').Router()
const hash = require('../models/userSession')





router.route('/hash').post((req, res) => {

    // console.log(req.session)
    const userId = req.body.userId
    const user = req.body.user





    hash.findOne({ user: req.body.user }, (err, prvUser) => {
      
        if (prvUser === null) {

            const newHash = new hash({
                userId,
                user
            })
            newHash.save()
                .then(() => res.json('Hash Sucessfully Genrated !!!'))
                .catch(err => res.status(400).json("MFH_CHECK : " + err))

        } else {

            return res.send({ message: 'Token Already Exist' })
        }

    })

})



module.exports = router
