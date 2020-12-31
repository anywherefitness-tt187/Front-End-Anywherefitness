import React from 'react';
import {Button,Card,CardTitle,CardText,CardSubtitle} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import InstructorClass from './InstructorClass';
 
function InstructorDashboard({loginInfo,classList,setClassList}){
const history=useHistory();
 
const handleClick=(e)=>{
 e.preventDefault();
 history.push(`/instructor/createform`);
}
 
return(
    <div className="ins_dashboard">
        <Card className="ins_card">
        {loginInfo ? <CardTitle tag="h5">{loginInfo}!</CardTitle> : <CardTitle tag="h5">Welcome to Anywhere Fitness!</CardTitle>}
        <CardText>As an instructor of Anywhere Fitness, you can create new classes! Also, update and delete them.
        </CardText>
        <Button color="primary" onClick={handleClick}> <h5>Create your New Class!</h5></Button>
        <div className="ins_classlist">
            <h3>Here are your Classes!</h3>
           {classList.length !==0 ? classList.map(item=>(
                <InstructorClass classList={classList} item={item} setClassList={setClassList} key={item.class_name} />
            )) : <CardSubtitle tag="h6"> No current classes, Please go ahead and click Create New Class below :</CardSubtitle>
           }
        </div>
        </Card>
    </div>
)
}
export default InstructorDashboard;