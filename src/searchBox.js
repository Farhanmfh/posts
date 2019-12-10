import React, { Component } from 'react'


class SearchBox extends Component {

    render() {
        return (
            <div style={{ textAlign: "center" }}>
            
            <input placeholder='Search Any Thing Here' className='form-control' type="text"
            onChange={this.props.handleInput} />
            
            </div>
        )
    }
}

export default SearchBox