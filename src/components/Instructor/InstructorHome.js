import React,{useState} from 'react';
import { Route, Switch} from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreateForm from './InstructorCreateForm';
import InstructorUpdateForm from './InstructorUpdateForm';
import EnrolledUsers from './EnrolledUsers';
import PrivateRoute from '../PrivateRoute';
import initialClass from './TestData';

export default function InstructorHome() {
   
 //make this classList to context  
//  const [classList,setClassList]=useState(initialClass);
const [classList,setClassList]=useState([]);
//  const [classDelete,setClassDelete]=useState(false);
 console.log('classList=',classList);

  return (
      <div className="ins_home">
        <Switch>
        <PrivateRoute exact path="/instructor/dashboard/:userid">
        <InstructorDashboard 
            classList={classList} 
            setClassList={setClassList}
           />
        </PrivateRoute>
        
        <Route exact path="/instructor/createform/:userid">
            <InstructorCreateForm />
        </Route>
        
        <Route path="/instructor/:userid/updateform/:classid">
            <InstructorUpdateForm  />
        </Route>

        <Route path="/instructor/:userid/enrolled/:classid">
            <EnrolledUsers />
        </Route>
      </Switch> 
      </div>
  )
}