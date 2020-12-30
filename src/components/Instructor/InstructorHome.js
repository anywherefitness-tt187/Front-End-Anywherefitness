import React,{useState} from 'react';
import { Route, Switch} from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreateForm from './InstructorCreateForm';
import InstructorUpdateForm from './InstructorUpdateForm';
import InstructorLogin from '../Login';
import PrivateRoute from '../PrivateRoute';
import NavBar from '../NavBar';

export default function InstructorHome() {
  
    const initialClass=[{
        class_name:"Burn More",
        class_description:"Burn More, Strengthen and Stretch",
        class_type:"Strength Traning",
        class_intensity:"Advanced",
        class_location:"22nd North St,Portland,OR 97235",
        class_starttime:"2020-12-28T22:17",
        class_duration:"45",
        class_maxsize:"30",
        class_id:1
        },
        {class_name:"Core Yoga",
        class_description:"Burn More, Strengthen and Stretch",
        class_type:"Yoga",
        class_intensity:"Advanced",
        class_location:"22nd North St,Portland,OR 97235",
        class_starttime:"2020-12-28T22:17",
        class_duration:"45",
        class_maxsize:"30",
        class_id:2
        },
]
   //make this classList to context  
  const [classList,setClassList]=useState(initialClass);
  console.log('classList=',classList);
  
  return (
      <div className="ins_home">
        <NavBar/>
        <Switch>
        <Route exact path="/instructor"> 
        <InstructorLogin/>
        </Route>

        <PrivateRoute exact path="/instructor/dashboard">
        <InstructorDashboard classList={classList} setClassList={setClassList}/>
        </PrivateRoute>
        
        <Route exact path="/instructor/createform">
            <InstructorCreateForm setClassList={setClassList}/>
        </Route>
        
        <Route path="/instructor/updateform/:id">
            <InstructorUpdateForm classList={classList} setClassList={setClassList}/>
        </Route>
      </Switch>

      </div>
  )
}