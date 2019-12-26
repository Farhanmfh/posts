import React, { Component } from 'react'
import axios from 'axios'


export class signIn extends Component {
    constructor() {
        super()
        this.state = {

            email: 'itfarhanexe@gmail.com',
            password: '',
            alert: '',
            errDisplay: "none",
            local: '',
            herf: 'http://localhost:3000/signIn'
        }

    }

    componentDidMount() {


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
                alert: "Invalid Email Address"
            })
        }
        else {

            const User = {

                email: this.state.email,
                password: this.state.password

            }
            axios.post('/signIn', User)
                .then(response => {
                   
                    if (response.data.isActive === false) {
                        return (this.setState({
                            errDisplay: 'block',
                            alert: 'Please Verify Your Account'
                        }),
                            setTimeout(() => {
                                window.location = '/verify'
                            }, 3000)
                        )

                    }
                    this.setState({
                        errDisplay: 'block',
                        alert: response.data.message,
                        local: response.data.token
                    })
                    if (response.data.message === 'OK' && response.data.isActive === true) {
                        localStorage.setItem(this.state.email, response.data.hash)
                    }
                    setTimeout(() => {
                        window.push = '/'
                    }, 2000)

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
            // .then(response => {

            //     if (this.state.alert === 'OK') {

            //         localStorage.setItem(this.state.email, this.state.local)

            //         const newHash = {
            //             userId: Hash,
            //             user: this.state.email
            //         }
            //         this.setState({
            //             local: Hash
            //         })
            //         axios.post('/hash', newHash)
            //             .then(res => {
            //                 if (res.data === 'Hash Sucessfully Genrated !!!' && localStorage.getItem(this.state.email) === Hash) {
            //                     console.log(Hash)
            //                     window.location = '/UserHome'
            //                 }
            //             })
            //             .catch(err => { console.log(err) })
            //     }
            // })             

        }

    }
    onClear = (e) => {
        e.preventDefault()
        localStorage.clear()
    }




    render() {
        return (
            <div className='register'>
                {}
                <div className='sign-up-form'>
                    <form onSubmit={this.onSubmit}>
                        <label style={{ display: this.state.errDisplay, color: "red", border: "red 1px solid", backgroundColor: "black" }}>

                            Alert : {this.state.alert} !

                            </label>
                        <br />
                        <h1>Login</h1>
                        <br />
                        <label >Email : </label>
                        <input required className='form-control' autoComplete="email" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
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