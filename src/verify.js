import React, { Component } from 'react'
import axios from 'axios'


export class verify extends Component {
    constructor() {
        super()
        this.state = {

            email: '',
            code: '',
            alert: '',
            errDisplay: "none",
        }
    }


    onChangeEmail = (e) => {

        this.setState({
            email: e.target.value
        })

    }

    onChangeCode = (e) => {

        this.setState({
            code: e.target.value
        })

    }

    onSubmit = (e) => {
        e.preventDefault()
        let regx = /^([a-z0-9.-]+)@([a-z0-9-]+)\..([a-z]{2,8})(.[a-z]{2,8})?$/
        let validemail = regx.test(this.state.email)
        if (!validemail) {
            return this.setState({
                errDisplay: 'block',
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
                        errDisplay: 'block',
                        alert: response.data.message + ' Please wait we are Redirecting.....',
                    })
                    setTimeout(() => {
                        if (response.data.message === 'User Verified') { 
                            window.location='/signIn'
                       }
                    }, 3000); 
                                       
                })
                .catch(err => {
                    if (err && err.response.status === 500) {
                        console.log(err)
                        this.setState({
                            errDisplay: 'block',
                            alert: 'Server Error Please Try Again Later or Contact Site Admin'
                        })
                    }
                })
        }

    }

    render() {
        return (
            <div>
                <div className='register' >
                    {}
                    <div className='sign-up-form'>
                        <form onSubmit={this.onSubmit}>
                            
                            <label style={{ display: this.state.errDisplay, color: "red", border: "red 1px solid", backgroundColor: "black" }}>Alert : {this.state.alert}! </label>
                            <br />
                            <h1>Verify your Account Here</h1>
                            <br />
                            <label >Email : </label>
                            <input required className='form-control' autoComplete="email" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
                            <label >Code : </label>
                            <input required className='form-control' type="text" name="password" onChange={this.onChangeCode} />
                            <br />
                            <button className='btn btn-success' value='Verify'> Verify</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default verify