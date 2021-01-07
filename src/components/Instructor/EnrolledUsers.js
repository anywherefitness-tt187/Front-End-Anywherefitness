import React,{useState,useEffect} from 'react';
import {Button,Card,CardTitle,CardImg, CardSubtitle, CardText} from 'reactstrap';
import {useHistory,useParams} from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { Spinner } from 'reactstrap';
import imagec from '../images/undraw_healthy_habit_bh5w.svg';
import imaged from '../images/undraw_fitness_tracker_3033.svg';

function EnrolledUsers(){
    const [pageLoading,setPageLoading]=useState(false);
    const [enrolledList,setEnrolledList]=useState([]);
    const history=useHistory();
    const params=useParams();
   
    console.log('id in erolledusers=',params)
  
    //get all the clients enrolled for the class#id
  useEffect(()=>{
      setPageLoading(true)
      axiosWithAuth()
      .get(`/api/class/${params.classid}/clients`)
      .then(res=>{
          console.log('res in get client',res)
          setEnrolledList(res.data)
          setPageLoading(false)
      })
      .catch(err=>{
          console.log('err in get class',err)
          setPageLoading(false)
      })
      },[params.classid])
    

const handleClick=(e)=>{
 e.preventDefault();
 history.push(`/instructor/dashboard/${params.userid}`);
}
 
return(
    <div className="ins_dashboard">
        {pageLoading ? 
            <div className="ins_dashboard">
                <h4>Loading...Please wait!"</h4> <Spinner color="primary" /> 
            </div>: 
        <>    
        <Card className="ins_card">
        <CardImg top width="100%" 
        className="dashimage"
        src= {imagec}> 
        </CardImg>
        <CardTitle tag="h3">Clients enrolled for this class:
        </CardTitle>
        
        {enrolledList.length ===0 ? <CardText><h4>No users enrolled in this class...</h4></CardText> :
        //  <CardSubtitle>{enrolledList[0].class_type}</CardSubtitle> 
        enrolledList.map(item=>{   
        return(
        <Card key={item.client_name} className="ins_classcard p-4">  
            <CardText className="mr-2 ml-2"><i>{item.class_name}</i></CardText>  
            <CardSubtitle className="mr-2 ml-2"><b>User: </b>{item.client_name}</CardSubtitle>
        </Card>)
        })
        } 
         <Button color="warning"  onClick={handleClick}>Go Back</Button>
         <CardImg top width="100%" 
        className="dashimage"
        src= {imaged}> 
        </CardImg>
        </Card>
        </>
        }
    </div>
)
}
export default EnrolledUsers;