import React, { Component } from 'react'
import axios from 'axios'


class EditPost extends Component {
    constructor() {
        super()
        this.state = {

            title: '',
            body: '',


        }

    }

    componentDidMount() {

        axios.get('/post/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    body: res.data.body,

                })
            }).catch(err => console.log(err))


    }
    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onChangeBody = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const post = {
            title: this.state.title,
            body: this.state.body
        }
        axios.post('/post/update/' + this.props.match.params.id, post)
            .then(res => console.log(res.data))
            .then(window.location = '/')
            console.log(post)
    }



    render() {
        console.log()
        return (
            <div className='form' >
                <h1>Edit Post here</h1>
                <form onSubmit={this.onSubmit}>
                    <label >Title : </label>
                    <input required type="text" placeholder='Title' name="title" onChange={this.onChangeTitle} value={this.state.title} />
                    <br />
                    <label >Post : </label>
                    <input required placeholder='Post' type="text" name="post" onChange={this.onChangeBody} value={this.state.body} />
                    <br />
                    <button className='buttonAddSubmit' value='Edit'> Edit Post</button>
                </form>
            </div>
        )
    }
}

export default EditPost;