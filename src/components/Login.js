import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import {Form,Input,Label,FormGroup,Button } from 'reactstrap';
import { axiosWithAuth } from '../utils/axiosWithAuth';


export default function Login({setLoginInfo}) {
    
    const history=useHistory();
    const [role,setRole]=useState('');
    const [loginData,setLoginData]=useState({
      username:"",
      password:"",
    }); 
  
    const[error,setError] =useState("");
  
    const handleChange=(e)=>{
      setLoginData({...loginData,
      [e.target.name]:e.target.value});
    }

    const handleRole=(e)=>{
      setRole({...role,
      [e.target.name]:e.target.value});
    }
  
  
    const handleSubmit=(e)=>{
        console.log('on submit=',loginData);
        console.log('role on submit=',role);
      e.preventDefault();
      axiosWithAuth()  
          .post(`/api/auth/login`,loginData)
          .then((res)=>{
            console.log('Response back from reqres:',res.data)
            window.localStorage.setItem('token', res.data.token)
            setLoginInfo(res.data.message)
            //route to client or instructor dashboard
            const loginRoute = res.data.role === "client" ? "/user/dashboard" :"/instructor/dashboard"
            history.push(loginRoute);
            //clear server error
            setError(null);      
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
        <FormGroup className="text-left">
        <Label htmlFor="role"> Role
            <select 
            id="role"
            name="role"
            value={role}
            onChange={handleRole}
            className="mt-2 ml-2"
            >
            <option value="">***Client or Instructor?***</option>
            <option value="client">Client</option>  
            <option value="instructor">Instructor</option>    
            </select>
        </Label>
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