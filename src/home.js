import React, { Component } from 'react'
import Post from './posts'
import './App.css'
import Dropdown from './DropDown'
import SearchBox from './searchBox'
import {
    Link
} from "react-router-dom";
import axios from 'axios'

class Home extends Component {
    constructor() {
        super()
        this.state = {

            data: [{
                "userId": 1,
                "id": 1,
                "title": "Loading",
                "body": "Loading"
            }],

            start: 0,

            end: 10,

            search: '',
        }

    }


    componentDidMount() {


        fetch('/post')
            .then(res => res.json())
            .then(json => this.setState({
                data: json
            })
            )
    }


    handleNext = () => {
        const { start } = this.state;
        this.setState(old => {
            if (start < this.state.data.length - 10) {
                return {
                    start: old.start + 10,
                    end: old.end + 10
                }
            }
        })
    }

    handleBack = () => {
        this.setState(old => {
            if (this.state.start > 0) {
                return {
                    start: old.start - 10,
                    end: old.end - 10
                }
            }

        })
    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    handlePage = (x) => {
        if (x === 10) {

            this.setState({ end: x.target.value + 10 })

        } else {

            this.setState({ end: x.target.value })

        }
    }

    deletePost = (id) => {
        axios.delete('post/' + id)
            .then(res => console.log(res))
        this.setState({
            // data: this.state.data.filter(el => el._id !== id)
            data: this.state.data.filter(el => el._id !== id)
        })
    }

    render() {
        const { data, start, search, end } = this.state
        // Show 1st The post
        const firstTen = data.slice(start, end)
        // Search Box
        const filterData = firstTen.filter(post => {
            return post.title.toLowerCase().includes(search.toLowerCase())
        })
        // Post Component
        const myPost = filterData.map(item => <Post deletePost={this.deletePost} key={item.title} url={item._id} post={item} />)

        return (
            
            <div className='container'>
              
                <br />
                <Link to='/addPost'> <button className='btn btn-success btn-add' onClick={this.handleSave}> Add Post </button> </Link>
                <br />
                <br />
                <SearchBox handleInput={this.handleSearch} />
                <Dropdown handleInput={this.handlePage} />

                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th style={{ width: "85%" }}>Post</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPost}
                    </tbody>
                </table>

                <button className='btn btn-info btn-back' onClick={this.handleBack}> Back </button>
                <button className='btn btn-info btn-next' style={{ textAlign: "center" }} onClick={this.handleNext}> Next </button>


            </div >
        )
    }

}

export default Home;