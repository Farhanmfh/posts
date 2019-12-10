import React, { Component } from 'react'
import axios from 'axios'


class AddPost extends Component {
    constructor() {
        super()
        this.state = {

            title: '',
            body: ''

        }

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

        const newPost = {
            title: this.state.title,
            body: this.state.body
        }

        axios.post('/post/add', newPost)
            .then(res => console.log(res))
            .then(
                
                window.location = '/'
            )



    }



    componentDidMount() {



    }

    render() {

        return (
            <div className='container' >
                <br />
                <h1 className='form'>Add Post here</h1>
                <form onSubmit={this.onSubmit}>
                    <label >Title : </label>
                    <input required className='form-control' type="text" name="title" onChange={this.onChangeTitle} />

                    <label >Post : </label>
                    <input required className='form-control' type="text" name="post" onChange={this.onChangeBody} />
                    <br />
                    <button className='btn btn-success' value='SavePost'> Save Post</button>
                </form>
            </div>
        )
    }
}

export default AddPost;