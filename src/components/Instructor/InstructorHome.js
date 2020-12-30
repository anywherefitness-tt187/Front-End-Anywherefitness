import React,{useState} from 'react';
import { Route, Switch} from 'react-router-dom';
import InstructorDashboard from './InstructorDashboard';
import InstructorCreateForm from './InstructorCreateForm';
import InstructorUpdateForm from './InstructorUpdateForm';
import PrivateRoute from '../PrivateRoute';
import initialClass from './TestData';

export default function InstructorHome({loginInfo}) {
  
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