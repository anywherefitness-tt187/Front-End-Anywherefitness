import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import './App.css';


export default function App() {
  return (
    <BrowserRouter>
    <div className= 'app'>
      <Route component={Home} path='/' exact/>
      <Route component={User} path='/user'/>
      </div>
      </BrowserRouter>
  )
}