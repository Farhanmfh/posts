import React, { Component } from 'react'
import './App.css'
class Todo extends Component {


    render() {
        return (
            <div className="todo-item">

                <input type="checkbox" 
                checked={this.props.completed} 
                onChange={() => console.log('Im Changed')}/>
                <p>{this.props.text}</p>



            </div>

        )

    }

}

export default Todo