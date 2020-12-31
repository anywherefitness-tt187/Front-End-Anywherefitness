import React,{useState} from 'react';
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import './App.css';
import NavBar from './components/NavBar';
import InstructorHome from './components/Instructor/InstructorHome';
import Register from './components/Register';
import Login from './components/Login';

export default function App() {
   const [loginInfo,setLoginInfo]=useState('');
 
  return (
    <BrowserRouter>
    <div className= 'app'>
      <NavBar/>
      <Switch>
      <Route component={Home} path='/' exact/>
      <Route component={User} path='/user'/>
      <Route path="/login">
        <Login setLoginInfo={setLoginInfo}/>
      </Route>  
      <Route path="/signup">
        <Register setLoginInfo={setLoginInfo}/>
      </Route>  
      <Route path="/instructor">
         <InstructorHome loginInfo={loginInfo}/>
      </Route> 
      </Switch>
      </div>
      </BrowserRouter>
  )
}