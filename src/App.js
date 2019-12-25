import React, { Component } from 'react';
import './App.css';
// import axios from 'axios'
// const Token = require('randomstring')

import Header from './header'
import Home from './home'
import About from './About'
import ContactAPI from './ContactAPI'
import PostInfo from './postInfo'
import ContactCard from './ContactCard'
import AddPost from './AddPost'
import signUp from './signUp'
import signIn from './signIn'
import EditPost from './EditPost'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import welcome from './welcome';
import Verify from './verify'

const Error = () => {
  return (

    <h1 style={{ textAlign: 'center' }}>404 Not Found</h1>
  )
}




const ProtectedRoutes = ({ component: Component, ...rest }) => {
  return (

    <Route
      {...rest}
      render={(props) => {
        if (localStorage.key(0)) {
          return <Component {...props} />
        } else {
          return <Redirect to='/signIn' />
        }
      }} />


  )
}


class App extends Component {
  render() {

    return (
      <Router>
        <Header />
        <Switch>
          <ProtectedRoutes path='/' exact component={Home} />
          <ProtectedRoutes path='/home' exact component={Home} />
          <ProtectedRoutes path='/about' component={About} />
          <ProtectedRoutes path='/contact' exact strict component={ContactAPI} />
          <ProtectedRoutes path='/home/:id' component={PostInfo} />
          <ProtectedRoutes path='/contact/:id' component={ContactCard} />
          <ProtectedRoutes path='/addPost' component={AddPost} />
          <ProtectedRoutes path='/edit/:id' component={EditPost} />
          <Route path='/verify' component={Verify} />
          <Route path='/signUp' component={signUp} />
          <Route path='/signIn' component={signIn} />
          <Route path='/:id' component={welcome} />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}


export default App;