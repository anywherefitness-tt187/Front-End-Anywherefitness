import React from 'react';
import { Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import './App.css';
import useDarkMode from './components/useDarkMode';
import NavBar from './components/NavBar';
import InstructorHome from './components/Instructor/InstructorHome';
import ClientHome from './components/client/ClientHome';
import Register from './components/Register';
import Login from './components/Login';

export default function App() {
  const [darkMode, setDarkMode] = useDarkMode(false);
  return (
    <div className={darkMode ? "dark-mode app" : "app"}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
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

      <Route path="/client">
        <ClientHome />
      </Route>

      </Switch> 
      </div>
  )
}