import React,{useState} from 'react';
import {Button,Card,CardTitle,CardText,CardSubtitle, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { FontAwesome } from 'react-icons/fa';
import { FaMapMarker,FaRegCalendar,FaClock} from 'react-icons/fa';
import { IconName,GiWeightLiftingUp,GiDuration } from "react-icons/gi";
import {IconContext} from "react-icons";
 
 
function InstructorClass({classList}){
 
return(
    <div className="ins_classes">
       <h3>Here are your Classes!</h3>
        <Card className="ins_classcard">
        <CardTitle tag="h5">{classList.class_name} in Anywhere Fitness!</CardTitle>
        <CardText className="ins_desc">{classList.class_description}</CardText>
        <CardSubtitle>{classList.class_type}</CardSubtitle>
        <CardBody>
        <IconContext.Provider value={{style:{ color: "rgb(117, 239, 255)"}}}>
           <CardSubtitle>  <GiWeightLiftingUp/> Intensity: {classList.class_intensity}</CardSubtitle>
         
             <CardText><FaMapMarker/>{classList.class_location}</CardText>
            
             <CardText> <FaRegCalendar/>{classList.class_starttime.slice(0,10)}</CardText>

             <CardText> <FaClock/> {classList.class_starttime.slice(11)}</CardText>

             <CardText><GiDuration/> Duration :{classList.class_duration}</CardText>
                         
             </IconContext.Provider>
             <CardText>Max Class Size:{classList.class_maxsize}</CardText>
             </CardBody>
        </Card>
    </div>
)
}
export default InstructorClass;