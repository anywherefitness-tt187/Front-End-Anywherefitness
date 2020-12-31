import React,{useState,useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import { Form,FormGroup,Input,Label,Button,Badge} from 'reactstrap';
import * as yup from "yup";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
 

function InstructorCreate({classList,setClassList}){
    const history=useHistory();
    const params=useParams();
    
    const [classInfo, setClassInfo]=useState({
        class_id:Date.now(),
        class_name:"",
        class_type:"",
        class_intensity:"",
        class_location:"",
        start_time:"",
        class_duration:"",
        class_max_size:30,
    })

    // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

    // server error
    const [serverError, setServerError] = useState("");

    // managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error
      const [errors, setErrors] = useState({
        class_name:"",
        class_type:"",
        class_intensity:"",
        class_location:"",
        start_time:"",
        class_duration:"",
        class_max_size:"",
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

  // Schema, used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    class_name: yup.string()
    .min(2,"Please enter name of atleast 2 characters")
    .required("ClassName is required!"),

    class_type:yup.string().required("Choose Type is required!"),

    class_intensity: yup.string()
    .oneOf(["Beginner","Intermediate","Advanced"])
    .required("Please choose one"),

    class_location: yup.string().required("Location is required!"),

    start_time: yup.string().required("date & time is required!"),

    class_duration:yup.string().required("Duration is required!"),
    
    class_max_size:yup.number().required("Maxsize is required!"),
  });

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('on submit=',classInfo)
    axiosWithAuth()  
          // .post(`https://jsonplaceholder.typicode.com/posts`, classInfo)//replace 2 with id once received from login
          .post(`/api/users/${params.id}/class`,classInfo)
          .then((res)=>{
            console.log('Response back from reqres:',res.data)
            setClassList([...classList,res.data])
            history.push(`/instructor/dashboard/${params.id}`)
            //clear server error
            setServerError(null);      
          })
          .catch((err)=>{
            console.log('server erro in post',err)
            setServerError("oops! Looks like server side error!");
          })        
  }
  const handleBack=()=>{
    history.push(`/instructor/dashboard/${params.id}`)
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
            <Label htmlFor="start_time">Class Start Time</Label>
            <Input name="start_time"
            id="start_time"
            type="datetime-local"
            value={classInfo.start_time}
            onChange={handleChange}
            placeholder="00:00"/>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_duration">Class Duration</Label>
            <Input name="class_duration"
            id="class_duration"
            value={classInfo.class_duration}
            onChange={handleChange}
            placeholder="30minutes"/>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="class_max_size">Class Max Size</Label>
            <Input name="class_max_size"
            id="class_max_size"
            type="number"
            min="3"
            max="30"
            value={classInfo.class_max_size}
            onChange={handleChange}
            />
            </FormGroup>
            <Button color="success"
            className="btn-lg  btn-block"
            type="submit"
            disabled={buttonIsDisabled}>Create Class</Button>

            <Button color="warning"
            className="btn-lg  btn-block"
            onClick={handleBack}>Go Back</Button>
        </Form>
    </div>
    </>
)
}

export default InstructorCreate;


 