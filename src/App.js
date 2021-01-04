import React from 'react';
import { Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import './App.css';
import NavBar from './components/NavBar';
import InstructorHome from './components/Instructor/InstructorHome';
import Register from './components/Register';
import Login from './components/Login';

export default function App() {
   
  return (
    <div className= 'app'>
      <NavBar/>
      <Switch>
      <Route exact path="/">
        <Home/>
      </Route> 

      <Route component={User} path='/user'/>

      <Route path="/login">
        <Login/>
      </Route>  

      <Route path="/signup">
        <Register/>
      </Route>  

      <Route path="/instructor">
         <InstructorHome />
      </Route>  

      </Switch> 
      </div>
  )
}