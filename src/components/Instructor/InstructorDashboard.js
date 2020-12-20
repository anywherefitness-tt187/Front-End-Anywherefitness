import React,{useState} from 'react';
import {Button,Card,CardTitle,CardText,CardSubtitle} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import InstructorClass from './InstructorClass';

function InstructorDashboard({classList,setClassList}){
const history=useHistory();

const handleClick=(e)=>{
 e.preventDefault();
 history.push('/instructor/instructorcreate');
}

return(
    <div className="ins_dashboard">
        <Card className="ins_card">
        <CardTitle tag="h5">Welcome to Anywhere Fitness!</CardTitle>
        <CardText>As an instructor of Anywhere Fitness, you can create new classes! Also, update and delete them.
        </CardText>
        <div className="ins_classlist">
           {classList.length !==0 ? classList.map(item=>(
                <InstructorClass classList={item} key={item.class_id} />
            )) : <CardSubtitle tag="h6"> No current classes, Please go ahead and click Create New Class below :</CardSubtitle>
           }
        </div>
            <Button color="primary" onClick={handleClick}>Create your New Class!</Button>
        </Card>
    </div>
)
}
export default InstructorDashboard;