import React,{useState,useEffect} from 'react';
import { Route, Switch} from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreateForm from './InstructorCreateForm';
import InstructorUpdateForm from './InstructorUpdateForm';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import PrivateRoute from '../PrivateRoute';
import initialClass from './TestData';

export default function InstructorHome({loginInfo}) {
  
 //make this classList to context  
 const [classList,setClassList]=useState(initialClass);
 console.log('classList=',classList);

//get all the class for this instructor user#id
 useEffect(()=>{
    axiosWithAuth()
    //replace 2 with id once login endpoint is updated
    .get(`/api/users/7/class`)
    .then(res=>{
        console.log('res in get class:',res.data)
        if (res.data.length !== 0){
            console.log('value in get class')
            setClassList([...classList,res.data[0]])
         }
    })
    .catch(err=>{
        console.log('err in get class',err)
    })
    //has to be id
    },[loginInfo])

  return (
      <div className="ins_home">
        <Switch>
        {/* <Route exact path="/instructor"> 
        <InstructorLogin/>
        </Route> */}

        <PrivateRoute exact path="/instructor/dashboard">
        <InstructorDashboard 
            loginInfo={loginInfo}
            classList={classList} 
            setClassList={setClassList}/>
        </PrivateRoute>
        
        <Route exact path="/instructor/createform">
            <InstructorCreateForm classList={classList} setClassList={setClassList}/>
        </Route>
        
        <Route path="/instructor/updateform/:id">
            <InstructorUpdateForm classList={classList} setClassList={setClassList}/>
        </Route>
      </Switch>

      </div>
  )
}