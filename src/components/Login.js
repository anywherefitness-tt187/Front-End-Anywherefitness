import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import {Form,Input,Label,FormGroup,Button } from 'reactstrap';
import NavBar from './NavBar';
import { axiosWithAuth } from '../utils/axiosWithAuth';


export default function Login({setLoginInfo}) {
    
    const history=useHistory();
    
    const [loginData,setLoginData]=useState({
      username:"",
      password:""
    }); 
  
    const[error,setError] =useState("");
  
    const handleChange=(e)=>{
      setLoginData({...loginData,
      [e.target.name]:e.target.value});
    }
  
  
    const handleSubmit=(e)=>{
        console.log('on submit=',loginData);
      e.preventDefault();
      axiosWithAuth() //to be replaced with axiosWithAuth once login is ready
          .post(`/api/auth/login`,loginData)
          .then((res)=>{
            console.log('Response back from reqres:',res.data)
            setLoginInfo(res.data.message)
            window.localStorage.setItem('token', res.data)
            //Get a user by id api call to know if this login id is
            //instructor or client and accordingly route push
            history.push('/instructor/dashboard')
            //clear server error
            // setError(null);      
          })
      .catch(err=>{
        console.log('error in loginData call',err);
        setError("Invalid Login name or Password");
        console.log('Login Failed for the User:',loginData.username);
      })
    }
  
    const routeToRegister=(e)=>{
       history.push('/signup');
    }

return (
    <>
    <NavBar/>
    <Form className="login-form"  
      onSubmit={handleSubmit}
      name="login"
      >
       <h2 className="text-center">Welcome !</h2>
       <FormGroup className="text-left">
        <Label htmlFor="username"> UserName </Label>
        <Input type="text"
        id="username"
        name="username"
        value={loginData.username}
        onChange={handleChange}
        placeholder="Enter your email"
        />
        </FormGroup>

        <FormGroup className="text-left">
        <Label htmlFor="password"> Password </Label>
        <Input type="password"
        id="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Password"
        />
        </FormGroup>
      
       <Button className="btn-lg btn-dark btn-block"
       type="submit"
       >Log in</Button>
        <p className="pt-4">Haven't registered yet?
        <Button 
        className="ml-3"
        onClick={routeToRegister}
         >Register</Button>
         </p>
       
        <div className="text-center p-2">
          <a href="/forgot-password">Forgot Password</a>
        </div>
    </Form>

    </>   
)

}