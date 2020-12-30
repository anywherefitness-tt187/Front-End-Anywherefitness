import React,{useState} from 'react';
import { Route, Switch} from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreateForm from './InstructorCreateForm';
import InstructorUpdateForm from './InstructorUpdateForm';
import PrivateRoute from '../PrivateRoute';
import NavBar from '../NavBar';

export default function InstructorHome({loginInfo}) {
  
    const initialClass=[{
        class_name:"Burn More",
        class_type:"Strength Traning",
        class_intensity:"Advanced",
        class_location:"22nd North St,Portland,OR 97235",
        start_time:"2020-12-28T22:17",
        class_duration:"45",
        class_max_size:30,
        id:1,
        user_id: 2
        },
        {class_name:"Core Yoga",
        class_type:"Yoga",
        class_intensity:"Advanced",
        class_location:"22nd North St,Portland,OR 97235",
        start_time:"2020-12-28T22:17",
        class_duration:"45",
        class_max_size:30,
        id:2,
        user_id: 2
        },
]

 //make this classList to context  
 const [classList,setClassList]=useState(initialClass);
 console.log('classList=',classList);

    // set classInfo by getting the class of that instructor id
    // useEffect(()=>{
    //     axios.get(`${baseUrl}/api/instructor/classlist`)
    //     .then(res=>{
    //         console.log('res in .get update=',res)
    //         const updateClass=res.data.find(item=>item.id === Number(params.id));
    //         setClassInfo(updateClass)
    //     })
    //     .catch(err=>{
    //         console.log('err in .get update',err)
    //     })

    // },[])

  return (
      <div className="ins_home">
        <NavBar/>
        <Switch>
        {/* <Route exact path="/instructor"> 
        <InstructorLogin/>
        </Route> */}

        <PrivateRoute exact path="/instructor/dashboard">
        <InstructorDashboard 
            loginMsg={loginInfo}
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