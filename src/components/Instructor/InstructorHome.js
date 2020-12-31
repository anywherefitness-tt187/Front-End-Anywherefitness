import React,{useState,useEffect} from 'react';
import { useParams, Route, Switch} from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreateForm from './InstructorCreateForm';
import InstructorUpdateForm from './InstructorUpdateForm';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import PrivateRoute from '../PrivateRoute';
import initialClass from './TestData';

export default function InstructorHome({loginInfo,userId}) {
  const params=useParams();
  console.log('params=',params)
 //make this classList to context  
 const [classList,setClassList]=useState(initialClass);
 console.log('classList=',classList);

//get all the class for this instructor user#id
 useEffect(()=>{
    axiosWithAuth()
    //replace 2 with id once login endpoint is updated
    .get(`/api/users/${userId}/class`)
    .then(res=>{
        console.log('res in get class:',res)
        if (res.data.length !== 0){
            const newList= res.data
            setClassList([...classList,...newList])
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

        <PrivateRoute exact path="/instructor/dashboard/:id">
        <InstructorDashboard 
            loginInfo={loginInfo}
            classList={classList} 
            setClassList={setClassList}/>
        </PrivateRoute>
        
        <Route exact path="/instructor/createform/:id">
            <InstructorCreateForm classList={classList} setClassList={setClassList}/>
        </Route>
        
        <Route path="/instructor/updateform/:id">
            <InstructorUpdateForm classList={classList} setClassList={setClassList}/>
        </Route>
      </Switch>

      </div>
  )
}