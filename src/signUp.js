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

            error: '',
            errDisplay: "none"

        }

    }


    componentDidMount() {

    }

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

    onSubmit = (e) => {
        e.preventDefault()

        if (this.state.password !== this.state.password2) {
            return this.setState({
                errDisplay: 'block',
                error: "Password does not match"
            })
        } else if (this.state.username.length < 3) {
            return this.setState({
                errDisplay: 'block',
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
                .then(response =>{ 
                    if (response.data.message === "Account Already Exist") {
                    return this.setState({
                        error: "Account Already Exist",
                        errDisplay : 'block'
                    })
                }
            }).catch(err => {
                if (err || err.response.status === 500) {
                    console.log(err)
                    this.setState({
                        errDisplay: 'block',
                        error: 'Server Error Please Try Again Later or Contact Site Admin'
                    })
                }
            })
                // .then(window.location = '/signIn')


        }
    }

    render() {


        return (
            <div className='register'>
                <div className='sign-up-form'>
                    <form onSubmit={this.onSubmit}>
                        <label style={{ display: this.state.errDisplay, color: "red", border: "red 1px solid", backgroundColor: "black" }}>Alert : {this.state.error} ! </label>
                        <br />
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

            </div>

        )
    }
}

export default signUp
