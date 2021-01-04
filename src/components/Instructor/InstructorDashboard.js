import React,{useState,useEffect} from 'react';
import {Button,Card,CardTitle,CardText,CardSubtitle} from 'reactstrap';
import {useHistory,useParams} from 'react-router-dom';
import InstructorClass from './InstructorClass';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import Spinner from 'react-bootstrap/Spinner'

function InstructorDashboard({classList,setClassList}){
    const [pageLoading,setPageLoading]=useState(false);

    const history=useHistory();
    const params=useParams();
    const [userName,setUserName]=useState('')
    console.log('id in ins dashboard=',params.userid,)
  
    //get all the class for this instructor user#id
  useEffect(()=>{
      axiosWithAuth()
      .get(`/api/users/${params.userid}`)
      .then(res=>{
          console.log('res in get user',res)
          setUserName(res.data.username)
      })
      .catch(err=>{
          console.log('err in get class',err)
      })
      },[params.userid])
    

//get all the class for this instructor user#id
useEffect(()=>{
    setPageLoading(true);
    axiosWithAuth()
    .get(`/api/users/${params.userid}/class`)
    .then(res=>{
        console.log('res in get class:',res)
        setPageLoading(false);
        if (res.data.length !== 0){
            const newList = res.data;
            setClassList([...newList])
         }
    })
    .catch(err=>{
        setPageLoading(false);
        console.log('err in get class',err)
    })
    //has to be id
    },[params.userid])
    // },[params.userid],classList)

const handleClick=(e)=>{
 e.preventDefault();
 history.push(`/instructor/createform/${params.userid}`);
}
 
return(
    <div className="ins_dashboard">
        {pageLoading ? 
            <div>
                <h4>Loading...Please wait!"</h4> <Spinner color="primary" /> 
            </div>: 
        <Card className="ins_card">
        <CardTitle tag="h3">Hi {userName}, Welcome to Anywhere Fitness!</CardTitle>
        <CardText><h4>As an instructor of Anywhere Fitness, you can create new classes! <br/> Also, update and delete them.</h4>
        </CardText>
        <Button color="primary" onClick={handleClick}> <h5>Create your New Class!</h5></Button>
        <div className="ins_classlist">
            <h3>Here are your Classes!</h3>
           {classList.length !==0 ? classList.map(item=>(
                <InstructorClass classList={classList} item={item} setClassList={setClassList} userName={userName} key={item.id} />
            )) : <CardSubtitle tag="h6"> No current classes, Please go ahead and click Create New Class below :</CardSubtitle>
           }
        </div>
        </Card>
        }
    </div>
)
}
export default InstructorDashboard;