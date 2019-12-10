import React, { Component } from 'react'
//import axios from 'axios'

export class signIn extends Component {
    constructor() {
        super()
        this.state = {

            email: '',
            password: '',
            error: '',
            errDisplay: "none",
            fetch: ''

        }

    }


    componentDidMount() {

        fetch('/login/users')
            .then(res => res.json())
            .then(json => this.setState({
                fetch: json
            }))

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


    onSubmit = (e) => {
        e.preventDefault()

        let regx = /^([a-z0-9.-]+)@([a-z0-9-]+)\..([a-z]{2,8})(.[a-z]{2,8})?$/
        let validemail = regx.test(this.state.email)

        if (!validemail) {
            return this.setState({
                errDisplay: 'block',
                error: "Invalid Email Address"
            })
        } else if (this.state.password !== 'test') {
            return this.setState({
                errDisplay: 'block',
                error: "Password Is incorrect"
            })
        } else {


        }
    }

    render() {
        console.log(this.state.fetch)
        return (
            <div className='register'>
                <div className='sign-up-form'>
                    <form onSubmit={this.onSubmit}>
                        <label style={{ display: this.state.errDisplay, color: "red", border: "red 1px solid", backgroundColor: "black" }}>Errors : {this.state.error} </label>
                        <br />
                        <h1>Login</h1>
                        <br />
                        <label >Email : </label>
                        <input required className='form-control' autoComplete="email" type="email" name="email" onChange={this.onChangeEmail} />
                        <label >Password : </label>
                        <input required className='form-control' type="password" autoComplete="new-password" name="password" onChange={this.onChangePassword} />
                        <br />
                        <button className='btn btn-success' value='SignIn'> SignIn</button>

                    </form>
                </div>

            </div>

        )
    }
}

export default signIn