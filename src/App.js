import React, { Component } from 'react';
import './App.css';
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
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const Error = () => {
  return(

    <h1>404 Not Found</h1>
  )
}
class App extends Component {
  render() {
    return (
      <Router>
          <Header />
          <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/home' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' exact strict component={ContactAPI} />
          <Route path='/home/:id' component={PostInfo} />
          <Route path='/contact/:id' component={ContactCard}/>
          <Route path='/addPost' component={AddPost}/>
          <Route path='/edit/:id' component={EditPost}/>
          <Route path='/signUp' component={signUp} />
          <Route path='/signIn' component={signIn} />
          <Route component={Error}/>
          </Switch>
      </Router>
    );
  }
}


export default App;