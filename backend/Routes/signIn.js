const router = require('express').Router()
const newUser = require('../models/user.model')
const userSession = require('../models/userSession')
//const bcrypt = require('bcrypt')


router.route('/session').get((req, res) => {
    userSession.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json("MFH_CHECK GET REQUEST: " + err))

})




router.route('/signIn').post((req, res) => {

    // console.log(req.session)
    const email = req.body.email.toLowerCase().trim()
    const password = req.body.password

    // prvUser.email === req.body.email && prvUser.password === req.body.password




    newUser.findOne({ email: req.body.email }, (err, prvUser) => {


        if (err || prvUser === null) {
            return res.send({ message: 'Account not Found' })

        }
        else if (prvUser.password !== req.body.password) {

            return res.send({ message: 'Incorrent Password' })
        }
        else if (prvUser.email === req.body.email && prvUser.password === req.body.password) {

            res.send({
                message: 'OK',
                token: prvUser.secretToken,
                isActive: prvUser.isActive
            })
        }

    })
})







module.exports = router