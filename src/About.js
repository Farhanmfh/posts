import React, { Component } from 'react'
import Todo from './todoCompoent'
import Tdata from './todoData'


class About extends Component {
    constructor() {
        super()
        this.state = {

            data: Tdata
        }
    }

    render() {
        const todoItem = this.state.data.map(item => <Todo key={item.id} text={item.text} completed={item.completed} />)
        return (
            <div className='todo-list'>
                <h1>To do List</h1>
                {todoItem}
            </div>
        )

    }
}

export default About;