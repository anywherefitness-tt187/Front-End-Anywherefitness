import React,{useState,useEffect} from 'react';
import { useParams, Route, Switch} from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreateForm from './InstructorCreateForm';
import InstructorUpdateForm from './InstructorUpdateForm';
import PrivateRoute from '../PrivateRoute';
import initialClass from './TestData';

export default function InstructorHome({loginInfo}) {
  const params=useParams();
  console.log('params=',params)
 //make this classList to context  
 const [classList,setClassList]=useState(initialClass);

//  const [classDelete,setClassDelete]=useState(false);
 console.log('classList=',classList);

  return (
      <div className="ins_home">
        <Switch>
        <PrivateRoute exact path="/instructor/dashboard/:userid">
        <InstructorDashboard 
            loginInfo={loginInfo}
            classList={classList} 
            setClassList={setClassList}
           />
        </PrivateRoute>
        
        <Route exact path="/instructor/createform/:userid">
            <InstructorCreateForm classList={classList} setClassList={setClassList}/>
        </Route>
        
        <Route path="/instructor/:userid/updateform/:classid">
            <InstructorUpdateForm classList={classList} setClassList={setClassList}/>
        </Route>
      </Switch> 
      </div>
  )
}