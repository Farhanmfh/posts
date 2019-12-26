const router = require('express').Router()
const newUser = require('../models/user.model')
const userHash = require('../models/userSession')
//const bcrypt = require('bcrypt')
const Token = require('randomstring')


const key = Token.generate(20)



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

            userHash.findOne({userId: req.body.email},(err, data)=>{
               console.log(data)
                res.send({
                    message: 'OK',
                    token: prvUser.secretToken,
                    isActive: prvUser.isActive,
                    hash: data.hash
                })



            })

           


            // if (prvUser === null || prvUser.length < 0) {
            //     const userId = req.body.email
            //     const hash = key

            //     const newHash = new userHash({
            //         userId,
            //         hash
            //     })
            //     newHash.save()
            //         .then(() => res.json('Hash Sucessfully Genrated !!!'))
            //         .catch(err => res.status(400).json("MFH_CHECK : " + err))
            // }

            const query = { userId: req.body.email }
            userHash.findOneAndUpdate(query, { hash: key }, (err) => {
                if (!err) {
                    console.log('Done')
                } else {
                    console.log(err)
                    return res.send({ message: 'Err' + err })

                }
            })



        }



    })
})







module.exports = router