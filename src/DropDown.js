import React, { Component } from 'react'


class Dropdown extends Component {
    render() {
        return (
            <div style={{ textAlign: "right" , fontSize: 15}} >
               <p style={{display : "inline"}}>Display Per Page : </p>
                <select onChange={this.props.handleInput} style={{fontSize: 20}}>
                    <option > 10 </option>
                    <option > 20 </option>
                    <option > 30 </option>
                    <option > 40 </option>
                    <option > 50 </option>
                    <option > 60 </option>
                    <option > 70 </option>
                    <option > 80 </option>
                    <option > 90 </option>
                    <option > 100 </option>
                </select>
            </div>
        )
    }
}


export default Dropdown