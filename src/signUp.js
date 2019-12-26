import React, { Component } from 'react'
import axios from 'axios'

export class signUp extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            code: '',
            error: '',
            Display: "none",
            formDisplayOpen: 'block',
            formDisplayClose: 'none'

        }

    }


    componentDidMount() {

    }

    // displaySwitch = () => {
    //     if (this.state.formDisplay === 'block') {
    //         this.setState({
    //             formDisplay: 'block'
    //         })
    //     } else {
    //         this.setState({
    //             formDisplay: 'none'
    //         })
    //     }

    // }

    onChangeUsername = (e) => {

        this.setState({
            username: e.target.value
        })

    }
    onChangeEmail = (e) => {

        this.setState({
            email: e.target.value
        })

    }
    onChangePassword = (e) => {

        this.setState({
            password: e.target.value
        })

    }
    onChangePassword2 = (e) => {

        this.setState({
            password2: e.target.value
        })

    }

    onChangeCode = (e) => {

        this.setState({
            code: e.target.value
        })

    }

    onSubmit = (e) => {
        e.preventDefault()

        if (this.state.password !== this.state.password2) {
            return this.setState({
                Display: 'block',
                error: "Password does not match"
            })
        } else if (this.state.username.length < 3) {
            return this.setState({
                Display: 'block',
                error: "User name should be atleast 3 letters"
            })
        } else {

            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2
            }
            axios.post('/signUp', newUser)
                .then(response => {
                    if (response.data.message === 'User Sucessfully Registred !!!') {
                        return (this.setState({
                            error: 'User Sucessfully Registred , Please Check your Email !',
                            Display: 'block',
                            formDisplayOpen: 'none',
                            formDisplayClose: 'block',
                        })
                        )
                    } else if (response.data.message === "Account Already Exist") {
                        console.log(response.data.message)
                        return (this.setState({
                            error: "Account Already Exist",
                            Display: 'block'
                        }))
                    }
                }).catch(err => {
                    if (err || err.response.status === 500) {
                        console.log(err)
                        this.setState({
                            Display: 'block',
                            error: 'Server Error Please Try Again Later or Contact Site Admin'
                        })
                    }
                })
            // .then(window.location = '/signIn')

          
        }
    }
    onVerify = (e) => {
        e.preventDefault()
        let regx = /^([a-z0-9.-]+)@([a-z0-9-]+)\..([a-z]{2,8})(.[a-z]{2,8})?$/
        let validemail = regx.test(this.state.email)
        if (!validemail) {
            return this.setState({
                Display: 'block',
                alert: "Invalid Email Address"
            })
        }
        else {

            const Code = {

                email: this.state.email,
                code: this.state.code

            }
            axios.post('/verify', Code)
                .then(response => {
                    console.log(response.data.isActive)
                    this.setState({
                        Display: 'block',
                        error: response.data.message ,
                    })
                    setTimeout(() => {
                        if (response.data.message === 'User Verified') {
                            window.location = '/signIn'
                        }
                    }, 3000);

                })
                .catch(err => {
                    if (err && err.response.status === 500) {
                        console.log(err)
                        this.setState({
                            Display: 'block',
                            error: 'Server Error Please Try Again Later or Contact Site Admin'
                        })
                    }
                })
           
        }

    }




    render() {


        return (
            <div className='register'>
            <label style={{ display: this.state.Display, color: "red", border: "red 1px solid", backgroundColor: "black" }}>Alert : {this.state.error} ! </label>
                        <br />
                <div className='sign-up-form' style={{ display: this.state.formDisplayOpen }}>
                    <form onSubmit={this.onSubmit}>
                       
                        <h1>Register</h1>
                        <br />
                        <label >Username : </label>
                        <input required className='form-control' type="text" autoComplete="username" name="username" onChange={this.onChangeUsername} />
                        <label >Email : </label>
                        <input required className='form-control' autoComplete="email" type="email" name="email" onChange={this.onChangeEmail} />
                        <label >Password : </label>
                        <input required className='form-control' type="password" autoComplete="new-password" name="password" onChange={this.onChangePassword} />
                        <label >Confrim Password : </label>
                        <input required className='form-control' type="password" autoComplete="new-password" onChange={this.onChangePassword2} />
                        <br />
                        <button className='btn btn-success' value='SignUp'> SignUp</button>
                    </form>




                </div>
                <div className='sign-up-form' style={{ display: this.state.formDisplayClose }}>
                    <label >Code : </label>

                    <form onSubmit={this.onVerify}>

                        <input required className='form-control' type="text" name="password" onChange={this.onChangeCode} />
                        <br />
                        <button className='btn btn-success' value='Verify'> Verify</button>

                    </form>
                </div>


            </div>

        )
    }
}

export default signUp
