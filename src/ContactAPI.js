import React, { Component } from 'react'
import Contact from './Contact'
import SearchBox from './searchBox'


class ContactAPI extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            search: '',

        }
    }
    componentDidMount() {

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(json => this.setState({
                data: json
            }
            ))
    }
    handleSearch = (e) => {
        this.setState({ search: e.target.value })

    }
    render() {

        const filter = this.state.data.filter(contact => {
            return contact.name.toLowerCase().includes(this.state.search.toLowerCase())
        })

        const myInfo = filter.map(item => <Contact key={item.id} url={item.id} info={item} />)



        return (
            <div style={{ textAlign: "center" }}>
                <h1>My Contact page</h1>
                <SearchBox handleInput={this.handleSearch} />
                <hr />
                <h3>{myInfo}</h3>
            </div>
        )
    }
}

export default ContactAPI;