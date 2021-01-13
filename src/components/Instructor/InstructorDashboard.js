import React,{useState,useEffect} from 'react';
import {Button,Card,CardTitle,CardText,CardSubtitle, CardImg} from 'reactstrap';
import {useHistory,useParams} from 'react-router-dom';
import InstructorClass from './InstructorClass';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { Spinner } from 'reactstrap';
import imagea from '../images/undraw_fitness_stats_sht6.svg';
import imageb from '../images/undraw_working_out_6psf.svg';
import { gsap } from "gsap";

function InstructorDashboard({classList,setClassList}){
    const [pageLoading,setPageLoading]=useState(false);

    const history=useHistory();
    const params=useParams();
    const [userName,setUserName]=useState('')
    // console.log('id in ins dashboard=',params.userid,)
  
    //get the username for the instructor user#id
  useEffect(()=>{
      axiosWithAuth()
      .get(`/api/users/${params.userid}`)
      .then(res=>{
        //   console.log('res in get user',res)
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
        // console.log('res in get class:',res)
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
    },[params.userid,setClassList])
 

     //animation on dashboard form whenever rendered
     useEffect(()=>{
        gsap.from(".ins_dashboard",{x:10,duration: 1,ease:"slow"})
      },[]);

const handleClick=(e)=>{
 e.preventDefault();
 history.push(`/instructor/createform/${params.userid}`);
}
 
return(
    <div className="ins_dashboard">
        {pageLoading ? 
            <div className="ins_card">
                <h4>Loading...Please wait!" <Spinner color="primary" /> </h4>
            </div>: 
        <>    
        <Card className="ins_card">
        <Card className="ins_intro">
        <CardTitle tag="h3">Hi {userName}, Welcome to Anywhere Fitness!</CardTitle>
        <CardImg top width="100%" 
        className="dashimage"
        src= {imageb}> 
        </CardImg>
        <CardText tag="h4">As an instructor of Anywhere Fitness, You can create new classes! update and delete them
        also, view the registered clients for your class.</CardText>
        <h3> Enjoy hosting fitness classes around the World!</h3>
        
        <Button color="primary" onClick={handleClick}> <h5>Create your New Class!</h5></Button>
        </Card>
        <div className="ins_classlist">
            <h3>Here are your Classes!</h3>
           {classList.length !==0 ? classList.map(item=>(
                <InstructorClass classList={classList} item={item} setClassList={setClassList} userName={userName} key={item.id} />
            )) : <CardSubtitle tag="h6"> No current classes, Please go ahead and click Create New Class below :</CardSubtitle>
           }
        </div>
        <CardImg top width="100%" 
        className="dashimage"
        src= {imagea}> 
        </CardImg>
        </Card>
        </>
        }
    </div>
)
}
export default InstructorDashboard;