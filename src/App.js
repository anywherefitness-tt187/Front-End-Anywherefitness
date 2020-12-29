import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import './App.css';
import InstructorHome from './components/Instructor/InstructorHome';
import Register from './components/Register';

export default function App() {

  return (
    <BrowserRouter>
    <div className= 'app'>
      <Route component={Home} path='/' exact/>
      <Route component={User} path='/user'/>
      <Route path="/signup" component={Register} />
      <Route path="/instructor" component={InstructorHome} />
      </div>
      </BrowserRouter>
  )
}