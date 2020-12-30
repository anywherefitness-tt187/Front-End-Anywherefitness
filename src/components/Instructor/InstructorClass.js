import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button,Card,CardTitle,CardText,CardSubtitle, CardBody} from 'reactstrap';
import { FaMapMarker,FaRegCalendar,FaClock} from 'react-icons/fa';
import { GiWeightLiftingUp,GiDuration } from "react-icons/gi";
import {IconContext} from "react-icons";
import {axiosWithAuth} from '../../utils/axiosWithAuth';
 
function InstructorClass({classList}){
    const history=useHistory();

const handleUpdate=(e)=>{
 e.preventDefault();
 history.push(`/instructor/updateform/${classList.id}`);
}

const handleDelete=()=>{

axiosWithAuth().delete(`/api/class/${classList.id}`)
.then(res=>{
    console.log('res in delete=',res)
    //update state to remove the deleted class id
    //reroute to class dashboard
})
.catch(err=>{
    console.log('err in delete',err)
})
}

return(
    <div className="ins_classes">
        <Card className="ins_classcard">
        <CardTitle tag="h5">{classList.class_name} in Anywhere Fitness!</CardTitle>
        <CardSubtitle>{classList.class_type}</CardSubtitle>
        <CardBody>
        <IconContext.Provider value={{style:{ color: "rgb(117, 239, 255)"}}}>
           <CardSubtitle>  <GiWeightLiftingUp/> Intensity: {classList.class_intensity}</CardSubtitle>
         
             <CardText><FaMapMarker/>{classList.class_location}</CardText>
            
             <CardText> <FaRegCalendar/>{classList.start_time.slice(0,10)}</CardText>

             <CardText> <FaClock/> {classList.start_time.slice(11)}</CardText>

             <CardText><GiDuration/> Duration :{classList.class_duration}</CardText>
                         
             </IconContext.Provider>
             <CardText>Max Class Size:{classList.class_max_size}</CardText>
             <Button color="info" onClick={handleUpdate}>Update</Button>
             <Button color="danger" onClick={handleDelete}>Delete</Button>
             </CardBody>
        </Card>
    </div>
)
}
export default InstructorClass;