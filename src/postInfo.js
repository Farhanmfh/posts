import React, { Component } from 'react'
import axios from 'axios'



class PostInfo extends Component {
    constructor() {
        super()
        this.state = {

            data: [{
                title: '',
                body: ''
            }]
        }

    }
    componentDidMount() {

        axios.get('/post/' + this.props.match.params.id )
            .then(res => this.setState({
                data: {
                    title: res.data.title,
                    body: res.data.body
                }
            }))

    }

    render() {

        return (
            <div style={{ textAlign: "center" }}>
                <h1 style={{ color: "#0a8cda" }}>Title: {this.state.data.title} </h1>
                <h3>Post: {this.state.data.body}</h3>
            </div >
        )
    }
}

export default PostInfo
