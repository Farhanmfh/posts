const router = require('express').Router()
const Token = require('randomstring')
const newUser = require('../models/user.model')
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "mail.globalelitetechnology.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'noreply_CODE@globalelitetechnology.com', // generated ethereal user
      pass: 'Goodpassword@047' // generated ethereal password
    }
  });

  

const key = Token.generate(5)

router.route('/users').get((req, res) => {
    newUser.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json("MFH_CHECK GET REQUEST: " + err))

})

router.route('/signUp').post((req, res) => {

    const username = req.body.username.trim()
    const email = req.body.email
    const password = req.body.password
    const isActive = false
    const secretToken = key

    
      
    


    // Input Valadation
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
    }

    // Account Already Exist Validation 

    newUser.find({ email: email, }, (err, prvUser) => {
        if (err) {
            return res.send('Error')
        } else if (prvUser.length > 0 ) {
            return res.send({ message: "Account Already Exist" })
        }


        // Save to DataBase


        const newRegister = new newUser({
            username,
            email,
            password,
            isActive,
            secretToken
        })
        let info = {
            from: 'noreply_CODE@globalelitetechnology.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Your Verification Code", // Subject line
            text: `This is your Verification code : ${key}`, // plain text body
            html: ''
          }

        //   sendMail('','','', (err,data)=>{
        //       if(!err){
        //           console.log('Sucess!!')
        //       }else if (err){
        //           console.log('Error wiht noob')
        //       }else {
        //           console.log(data)
        //       }
        //   })

        transporter.sendMail(info,(err,data)=>{
            if(!err){
                console.log(data)
            }else if (err){
                console.log(err)
            }else {
                console.log(data)
            }
        })
        


        newRegister.save()
            .then(() => res.json('User Sucessfully Registred !!!'))
            .catch(err => res.status(400).json("MFH_CHECK : " + err))
            
            // req.session.user = sessionUser;
            // res.send(sessionUser);
    })
})


router.route('/users/:id').delete((req, res) => {
    newUser.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleed"))
        .catch(err => res.status(400).json("MFH_CHECK DELETE BY ID: " + err))
})


router.route('/users/:id').get((req, res) => {
    newUser.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("MFH_CHECK FIND BY ID" + err))
})



module.exports = router