import React,{useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Form,Input,Label,FormGroup,Button } from 'reactstrap';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { gsap } from "gsap";
import * as yup from "yup";
import { Spinner } from 'reactstrap';

export default function Login({setLoginInfo}) {
    
    const history=useHistory();
 
    const [loginData,setLoginData]=useState({
      username:"",
      password:"",
      role:"",
    }); 

   //animation on register form whenever rendered
   useEffect(()=>{
    gsap.from(".ins-dashboard",{x:10,duration: 1,ease:"slow"})
  },[]);

    const [loading,setLoading]=useState(false);
    const[error,setError] =useState(null);

     // managing state for yup validation errors.  
     const [errors, setErrors] = useState({
      username:"",
      password:"",
      role:"",
    });
  
    const handleChange=(e)=>{
      e.persist();       
        const newLoginData = {
            ...loginData,
            [e.target.name]:e.target.value
          };
          console.log('After validate loginData=',loginData);
          validateChange(e); // for each change in input, do inline validation
          console.log('After validate err State=', errors)
          setLoginData(newLoginData); // update state with new data
    }

  
    // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  //inline validation of one key-value pair at a time with yup
  const validateChange =(e)=>{
    yup.reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then((valid) => {
      // the input is passing!
      // the reset of that input's error
      console.log("valid here", e.target.name);
      setErrors({ ...errors, [e.target.name]: "" });
    })
    .catch((err) => {
      // the input is breaking form schema
      console.log("err here", err);
      setErrors({ ...errors, [e.target.name]: err.errors[0] });
    });
 }

   // whenever state updates, validate the entire form.
 // if valid, then change button to be enabled.
 useEffect(() => {
   formSchema.isValid(loginData).then((valid) => {
     console.log("is my form valid?", valid);

     // valid is a boolean 
     setButtonIsDisabled(!valid);
   });
 },[loginData]);

   // Add a schema, used for all validation to determine whether the input is valid or not
 const formSchema = yup.object().shape({
   username: yup.string()
   .min(4,"Please enter name of atleast 4 characters")
   .required("Name is required"),
   
   password: yup.string()
   .min(5,"Please enter password of atleast 5 characters")
   .required("Please enter Password"),

   role: yup.string()
   .oneOf(["client","instructor"],"Please choose Client or Instructor")
   .required("Please enter role!"),
  });

    const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true);
        postLogin();
    }

    const postLogin=()=>{
      const loginPayload={
        username: loginData.username,
        password:loginData.password}
      axiosWithAuth()  
          .post(`/api/auth/login`,loginPayload)
          .then((res)=>{
            console.log('Response back from reqres:',res.data)
            setLoading(false);
            window.localStorage.setItem('token', res.data.token)
            // setLoginInfo(res.data.message)
            //route to client or instructor dashboard
            const loginRoute = res.data.role === "client" ? `/user/dashboard/${res.data.id}` :`/instructor/dashboard/${res.data.id}`
            history.push(loginRoute);
            //clear server error
            // setError(null);      
          })
      .catch(err=>{
        console.log('error in loginData call',err);
        setLoading(false);
        setError("Invalid Login name or Password");
        console.log('Login Failed for the User:',loginData.username);
      })
    }
  
    const routeToRegister=(e)=>{
       history.push('/signup');
    }
 
return (
    <>
    {error ? <div className="error p-4 text-center">
      <p>Oops something went wrong!</p>
      <h6>Login Failed for the User: {loginData.username}</h6>
    </div> :
    <>
       {loading ? 
       <div className="login-form" >
        <h4>Loading...Please wait <Spinner color="primary" /> </h4>
       </div>: 
    <div>   
    <Form className="login-form"  
      onSubmit={handleSubmit}
      name="login"
      >
       <h2 className="text-center">Welcome !</h2>
       <FormGroup className="text-left">
        <Label htmlFor="username"><b> UserName</b> </Label>
        <Input type="text"
        id="username"
        name="username"
        value={loginData.username}
        onChange={handleChange}
        placeholder="Enter your email"
        />
        {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
        </FormGroup>

        <FormGroup className="text-left">
        <Label htmlFor="password"><b> Password</b> </Label>
        <Input type="password"
        id="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Password"
        />
        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
        </FormGroup>
        <FormGroup className="text-left">
        <Label htmlFor="role"> <b>Role</b>
            <select 
            id="role"
            name="role"
            value={loginData.role}
            onChange={handleChange}
            className="mt-2 ml-2"
            >
            <option value="">***Client or Instructor?***</option>
            <option value="client">Client</option>  
            <option value="instructor">Instructor</option>    
            </select>
        </Label>
        {errors.role.length > 0 ? <p className="error">{errors.role}</p> : null}
        </FormGroup>
      
       <Button className="btn-lg btn-block ml-2"
       type="submit"
       color="primary"
       disabled={buttonIsDisabled}
       >Log in</Button>
        <p className="pt-4">Haven't registered yet?
        <Button 
        className="ml-3 btn-dark "
        onClick={routeToRegister}
         >Register</Button>
         </p>
       
        <div className="text-center p-2">
          <a href="/forgot-password">Click here Forgot Password?</a>
        </div>
    </Form>
    </div>
    }
  </>
  }
    </>   
)

}