import React,{useState,useEffect} from 'react';
import {Button,Card,CardTitle,CardText,CardSubtitle, CardImg} from 'reactstrap';
import {useHistory,useParams} from 'react-router-dom';
import InstructorClass from './InstructorClass';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { Spinner } from 'reactstrap';
import imagea from '../images/undraw_fitness_stats_sht6.svg';
import imageb from '../images/undraw_working_out_6psf.svg';

function EnrolledUsers(){
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
    
 
const handleClick=(e)=>{
 e.preventDefault();
 history.push(`/instructor/createform/${params.userid}`);
}
 
return(
    <div className="ins_dashboard">
        {pageLoading ? 
            <div className="ins_dashboard">
                <h4>Loading...Please wait!" <Spinner color="primary" /> </h4>
            </div>: 
        <>    
        <Card className="ins_card">
        <CardTitle tag="h3">Clients enrolled for this class: </CardTitle>
        <CardImg top width="100%" 
        className="dashimage"
        src= {imagea}> 
        </CardImg>
         <Button color="warning" onClick={handleClick}>Back</Button>
         </Card>
        </>
        }
    </div>
)
}
export default EnrolledUsers;