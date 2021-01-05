import React,{useState,useEffect} from 'react';
import '../App.css';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap';  
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

function Register({setLoginInfo}) {
    const history=useHistory();

    const [userInfo, setUserInfo]=useState({
        username:"",
        password:"",
        role:"",
    })
     
      // managing state for errors.  
      const [errors, setErrors] = useState({
        username:"",
        password:"",
        role:"",
      });

    // server error
    const [serverError, setServerError] = useState("");

    // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

    const handleChange=(e)=>{
        e.persist();
        const newUserInfo = {
            ...userInfo,
            [e.target.name]:e.target.value
          };
          console.log('After validate userInfo=',userInfo);
          validateChange(e); // for each change in input, do inline validation
          console.log('After validate err State=', errors)
          setUserInfo(newUserInfo); // update state with new data
    }

    
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
    formSchema.isValid(userInfo).then((valid) => {
      console.log("is my form valid?", valid);

      // valid is a boolean 
      setButtonIsDisabled(!valid);
    });
  },[userInfo]);

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
        console.log('userInfo in submit',userInfo)
        e.preventDefault();
        callPost();           
      }
    const baseURL= "https://anywherefitness187.herokuapp.com"

      function callPost(){
         axios
          //to be replaced with fitness api from backend
          .post(`${baseURL}/api/auth/register`, userInfo)
          .then((res)=>{
              //update the stored post - with response from api
              console.log('Response back from reqres:',res.data)
              localStorage.setItem('token', res.data.token)
              console.log('role=',res.data.cred.role);
              console.log('id=',res.data.data.slice(3));
              const userId=res.data.data.slice(3);
             //route to client or instructor dashboard
                const signUpRoute = res.data.cred.role === "client" ? `/user/dashboard/${userId}` :`/instructor/dashboard/${userId}`
                history.push(signUpRoute);
             //clear server error
               setServerError(null);
          })
          .catch((err)=>{
            console.log('server erro in post',err)
            setServerError("oops! Looks like server side error!");
          })
      }
  

  return (
    <>
    <Form className="register-form"
         onSubmit={handleSubmit}
         name="register">
      {serverError && <p className="error">{serverError}</p>}
       <h2 className="text-center">Please Register!</h2>

       <FormGroup className="text-left">

        <Label htmlFor="userName">Name </Label>     
        <Input type="text"
        id="username"
        name="username"
        value={userInfo.username}
        onChange={handleChange}
        placeholder="Enter your Name"
        />
        {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
        </FormGroup>
        
        <FormGroup className="text-left">
        <Label htmlFor="password"> Password  </Label>
        <Input type="password"
        id="password"
        name="password"
        value={userInfo.password}
        onChange={handleChange}
        placeholder="Password"
        />
        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
        </FormGroup>
 
        <FormGroup className="text-left">
        <Label htmlFor="role" > Role
            <select 
            id="role"
            name="role"
            value={userInfo.role}
            onChange={handleChange}
            className="mt-2 ml-2"
            >
            <option value="">***Please Choose One!***</option>
            <option value="client">Client</option>  
            <option value="instructor">Instructor</option>    
            </select>
            {errors.role.length > 0 ? <p className="error">{errors.role}</p> : null}
        </Label>
        </FormGroup>

       <Button className="btn-lg btn-block"
       color="primary"
       type="submit"
       disabled={buttonIsDisabled}
       >Register</Button>
    </Form>
    </>
  );
}

export default Register;
