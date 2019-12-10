import React, { Component } from 'react'
import {
    Link
  } from "react-router-dom";
class Header extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                   <Link className='navbar-brand' to='/'> <img width="60" src='http://localhost:3000/favicon.ico' alt="Logo" /> My Posts Project </Link>
                    <ul className='navbar-nav mr-auto'>
                        <Link  className='nav-link' to='/'>
                            <li className="navbar-item">Home</li>
                        </Link>
                        <Link className='nav-link' to='/about'>
                            <li className="navbar-item">About</li>
                        </Link>
                        <Link className='nav-link' to='/contact'>
                            <li className="navbar-item">Contact Us</li>
                        </Link>
                        <Link className='nav-link' to='/signIn'>
                        <li className="navbar-item"> Sign In</li>
                        </Link>
                        <Link className="nav-link" to="/signUp">
                        <li className="navbar-item"> Register</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        )
    }

}


export default Header