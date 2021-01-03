import React,{useState} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {Button,Card,CardTitle,CardText,CardSubtitle, CardBody} from 'reactstrap';
import { FaMapMarker,FaRegCalendar,FaClock} from 'react-icons/fa';
import { GiWeightLiftingUp,GiDuration } from "react-icons/gi";
import {IconContext} from "react-icons";
import {axiosWithAuth} from '../../utils/axiosWithAuth';
import Modal from 'react-bootstrap/Modal';
 
 
function InstructorClass({classList,setClassList,item,}){
    const history=useHistory();
    const params=useParams();
    //setup Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteClass=classList.filter(e=>e.id == item.id)
    console.log('deleteClass=',deleteClass);

const handleUpdate=(e)=>{
 e.preventDefault();
 history.push(`/instructor/${params.userid}/updateform/${item.id}`);
}

const handleDelete=()=>{

axiosWithAuth().delete(`/api/class/${item.id}`)
.then(res=>{
    console.log('res in delete=',res)
    const newList=classList.filter(e=>e.id !== item.id)
    console.log('newList in delete=',newList);
    setClassList(newList);
    
})  
.catch(err=>{
    console.log('err in delete',err)
})
handleShow();
}

return(
    <>
    {show ?
    <Modal show={show} onHide={handleClose} deleteClass={deleteClass}
    backdrop="static"
    keyboard={false}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Header closeButton>
        <Modal.Title>Dear {deleteClass[0].username}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>The class you created :{deleteClass[0].class_name} is deleted now...</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
        Save Changes
        </Button>
        </Modal.Footer>
    </Modal> :
    <div className="ins_classes">
        <Card className="ins_classcard">
        <CardTitle tag="h5">{item.class_name} in Anywhere Fitness!</CardTitle>
        <CardSubtitle>{item.class_type}</CardSubtitle>
        <CardBody>
        <IconContext.Provider value={{style:{ color: "rgb(117, 239, 255)"}}}>
           <CardSubtitle>  <GiWeightLiftingUp/> Intensity: {item.class_intensity}</CardSubtitle>
         
             <CardText><FaMapMarker/>{item.class_location}</CardText>
            
             <CardText> <FaRegCalendar/>{item.start_time.slice(0,10)}</CardText>

             <CardText> <FaClock/> {item.start_time.slice(11)}</CardText>

             <CardText><GiDuration/> Duration :{item.class_duration}</CardText>
                         
             </IconContext.Provider>
             <CardText>Max Class Size:{item.class_max_size}</CardText>
             <Button color="info" onClick={handleUpdate}>Update</Button>
             <Button color="danger" onClick={handleDelete}>Delete</Button>
             </CardBody>
        </Card>
    </div>
    }
    </>
)
}
export default InstructorClass;