import React, { Component } from 'react'

export class Auth extends Component {
    constructor() {
        super()
        this.auth = false
    }

    login(e) {
        this.auth = true
        e();
    }

    logout(e) {
        this.auth = false
        e()
    }

    isAuth() {

        return this.auth
    }


    render() {
        return (
            <div>

            </div>
        )
    }
}

export default new Auth()
