import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Contact extends Component {
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h2> Name: <Link to={`/contact/${this.props.url}`}> {this.props.info.name} </Link> </h2>
                <hr style={{ width: "60%" }} />
            </div>
        )
    }
}

export default Contact