import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { Form,FormGroup,Input,Label,Button,Badge} from 'reactstrap';
import * as yup from "yup";
import axios from "axios";

function InstructorCreate({setClassList}){
    const history=useHistory();
    
    const [classInfo, setClassInfo]=useState({
        class_name:"",
        class_description:"",
        class_type:"",
        class_intensity:"",
        class_location:"",
        class_starttime:"",
        class_duration:"",
        class_maxsize:"",
    })

    // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

    // server error
    const [serverError, setServerError] = useState("");

    // managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error
      const [errors, setErrors] = useState({
        class_name:"",
        class_description:"",
        class_type:"",
        class_intensity:"",
        class_location:"",
        class_starttime:"",
        class_duration:"",
        class_maxsize:"",
      });

      const handleChange=(e)=>{
        e.persist();
        const newClassInfo = {
            ...classInfo,
            [e.target.name]:e.target.value
          };
          validateChange(e); // for each change in input, do inline validation
          console.log('After validate err State=', errors)
          setClassInfo(newClassInfo); // update state with new data
    }

    //inline validation of one key-value pair at a time with yup
  const validateChange =(e)=>{
    yup.reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then((valid) => {
      // the input is passing ! & reset of that input's error
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
    formSchema.isValid(classInfo).then((valid) => {
      console.log("is my form valid?", valid);
      // valid is a boolean 
      setButtonIsDisabled(!valid);
    });
  }, [classInfo]);

  // Add a schema, used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    class_name: yup.string()
    .min(2,"Please enter name of atleast 2 characters")
    .required("ClassName is required!"),
    
    class_description:yup.string(),

    class_type:yup.string().required("Choose Type is required!"),

    class_intensity: yup.string()
    .oneOf(["Beginner","Intermediate","Advanced"])
    .required("Please choose one"),

    class_location: yup.string().required("Location is required!"),

    class_starttime: yup.string().required("date & time is required!"),

    class_duration:yup.string().required("Duration is required!"),
    
    class_maxsize:yup.string().required("Maxsize is required!"),
  });

  const url = 'xxx.herokuapp.com';

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('on submit=',classInfo)
    axios //to be replaced with axiosWithAuth once login is ready
          .post(`https://jsonplaceholder.typicode.com/posts`, classInfo)
          .then((res)=>{
            console.log('Response back from reqres:',res.data)
            setClassList(res.data)
            // history.push('/dashboard/classes')
            //clear server error
            setServerError(null);      
          })
          .catch((err)=>{
            console.log('server erro in post',err)
            setServerError("oops! Looks like server side error!");
          }) 
          
  }

return(
    <>
    <h3>Hello Instructor Name! <br/><Badge color="primary">Create new Class</Badge></h3>
    <div className="ins_create">
        <Form onSubmit={handleSubmit}
         name="inscreate">
        {serverError && <p className="error">{serverError}</p>}
            <FormGroup>
            <Label htmlFor="class_name">Class Name</Label>
            <Input name="class_name"
            id="class_name"
            value={classInfo.class_name}
            onChange={handleChange}
            placeholder="Burn With us!"/>
             {errors.class_name.length > 0 ? <p className="error">{errors.class_name}</p> : null}
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_description">Class Description</Label>
            <Input name="class_description"
            id="class_description"
            type="textarea"
            row="4"
            value={classInfo.class_description}
            onChange={handleChange}
            placeholder="Pre-requisites, things to bring..."/>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_type">Class Type</Label>
            <Input
            name="class_type"
            type="select"
            id="class_type"
            value={classInfo.class_type}
            onChange={handleChange}>
            <option value="">***Please Choose One!***</option>
            <option>Strength Training</option>
            <option>Spin Class</option>
            <option>Power Lift</option>
            <option>Yoga</option>
            <option>Pilates</option>
            </Input> 
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_intensity">Class Intensity</Label>
            <Input
            type="select"
            name="class_intensity"
            id="class_intensity"
            value={classInfo.class_intensity}
            onChange={handleChange}>
            <option value="">***Please Choose One!***</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            </Input> 
            </FormGroup>
{/* q: backend, 4 fields for location? */}
            <FormGroup>
            <Label htmlFor="class_location">Class Location</Label>
            <Input name="class_location"
            id="class_location"
            value={classInfo.class_location}
            onChange={handleChange}
            placeholder="Street,City,State,Zip"/>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_starttime">Class Start Time</Label>
            <Input name="class_starttime"
            id="class_starttime"
            type="datetime-local"
            value={classInfo.class_startime}
            onChange={handleChange}
            placeholder="00:00"/>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_duration">Class Duration</Label>
            <Input name="class_duration"
            id="class_duration"
            type="number"
            value={classInfo.class_duration}
            onChange={handleChange}
            placeholder="30minutes"/>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_maxsize">Class Max Size</Label>
            <Input name="class_maxsize"
            id="class_maxsize"
            type="number"
            min="3"
            max="50"
            value={classInfo.class_maxsize}
            onChange={handleChange}
            />
            </FormGroup>
            <Button color="success"
            className="btn-lg  btn-block"
            type="submit"
            disabled={buttonIsDisabled}>Create Class</Button>
        </Form>
    </div>
    </>
)
}

export default InstructorCreate;


 