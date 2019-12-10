const router = require('express').Router()
const Token = require('randomstring')
const newUser = require('../models/user.model')


const key = Token.generate(5)

router.route('/users').get((req, res) => {
    newUser.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json("MFH_CHECK : " + err))

})

router.route('/signUp').post((req, res) => {

    const username = req.body.username.trim()
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2
    isActive = false
    secretToken = key

    let regx = /^([a-z0-9\.-]+)@([a-z0-9-]+)\..([a-z]{2,8})(.[a-z]{2,8})?$/
    let Validemail = regx.test(email)


    if (!username) {
        return res.send({ message: 'Username field cannot be blank !!!' })
    } else if (username.length < 3) {
        return res.send({ message: 'Username must should be atleast 3 Chareters !!!' })
    } else if (!email) {
        return res.send({ message: 'Email field cannot be blank !!!' })
    } else if (!Validemail) {
        return res.send({ message: 'Invaild Email Address' })
    } else if (!password) {
        return res.send({ message: 'Password field cannot be blank !!!' })
    } else if (!password2) {
        return res.send({ message: 'Confirm Password field cannot be blank  !!!' })
    } else if (password2 !== password) {
        return res.send({ message: 'Password Does not Match  !!!' })
    }

   


    newUser.find({ email: email, }, (err, prvUser) => {
        if (err) {
            res.send('Error')
        } else if (prvUser.length > 0) {
            return res.send({ message: "Account Already Exist" })
        } else {
            const newRegister = new newUser({
                username,
                email,
                password,
                password2,
                isActive,
                secretToken

            })


            newRegister.save()
                .then(() => res.json('User Sucessfully Registred !!!'))
                .catch(err => res.status(400).json("MFH_CHECK : " + err))
                
        }
    })
})


router.route('/users/:id').delete((req, res) => {
    newUser.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleed"))
        .catch(err => res.status(400).json("MFH_CHECK DELETE: " + err))
})

router.route('/users/:id').get((req, res) => {
    newUser.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("MFH_CHECK FIND BY ID" + err))
})



module.exports = router