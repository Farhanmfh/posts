import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";



class Post extends Component {
    render() {

        return (

            <tr>
                <td>
                    <h4>
                        <Link to={`/home/${this.props.url}`}>
                            {this.props.post.title}
                        </Link>
                    </h4>
                </td>
                <td>
                    <Link to={`/edit/${this.props.url}`}>
                        <input type="button" className='btn btn-secondary' value='Edit' />
                    </Link>
||
                    <input type="button" className='btn btn-danger' value='Delete'
                        onClick={() => { this.props.deletePost(this.props.url) }} />
                </td>
            </tr>

        );
    }

}

export default Post;

