import React,{useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreate from './InstructorCreate';

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
]
   //make this classList to context  
  const [classList,setClassList]=useState(initialClass);
  console.log('classList=',classList);

  return (
      <div className="ins_home">
        <Route exact path="/instructor">
          <InstructorDashboard classList={classList} setClassList={setClassList}/>
        </Route>
     

      <Route exact path="/instructor/instructorcreate">
            <InstructorCreate setClassList={setClassList}/>
      </Route>

      </div>
  )
}