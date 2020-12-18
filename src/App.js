import React,{useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import './App.css';
import InstructorDashboard from './components/Instructor/InstructorDashboard';
import InstructorCreate from './components/Instructor/InstructorCreate';


export default function App() {
  const [classList,setClassList]=useState();
  console.log('classList=',classList);

  return (
    <BrowserRouter>
    <div className= 'app'>
      <Route component={Home} path='/' exact/>
      <Route component={User} path='/user'/>
      </div>
      </BrowserRouter>
  )
}