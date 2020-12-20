import React,{useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import './App.css';
import InstructorHome from './components/Instructor/InstructorHome';

export default function App() {

  return (
    <BrowserRouter>
    <div className= 'app'>
      <Route component={Home} path='/' exact/>
      <Route component={User} path='/user'/>
      <Route path="/instructor">
        <InstructorHome/>
      </Route>
      </div>
      </BrowserRouter>
  )
}