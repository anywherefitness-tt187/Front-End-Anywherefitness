import React from 'react';
import {Button,Card,CardTitle,CardText} from 'reactstrap';
import {Link} from 'react-router-dom';

function InstructorDashboard(){

return(
    <div className="ins_dashboard">
        <Card className="ins_card">
        <CardTitle tag="h5">Welcome to Anywhere Fitness!</CardTitle>
        <CardText>Being an instructor, you can create new classes!
            Also, update and delete them.
        </CardText>
        <Link to="/dashboard/instructorcreate">
        <Button color="primary" >Create your New Class!</Button>
        </Link>
        </Card>
    </div>
)
}
export default InstructorDashboard;