import React,{useState} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {Button,Card,CardTitle,CardText,CardSubtitle, CardBody} from 'reactstrap';
import { FaMapMarker,FaRegCalendar,FaClock,FaUserFriends} from 'react-icons/fa';
import {MdFitnessCenter} from  "react-icons/md";
import { GiWeightLiftingUp,GiDuration } from "react-icons/gi";
import {IconContext} from "react-icons";
import {axiosWithAuth} from '../../utils/axiosWithAuth';
import Modal from 'react-bootstrap/Modal';
 
 
function InstructorClass({classList,setClassList,item,userName}){
    const history=useHistory();
    const params=useParams();
    //setup Modal
    const [show, setShow] = useState(false);

    const handleClose = () =>{
        setShow(false);
        const newList=classList.filter(e=>e.id !== item.id)
        console.log('newList in delete=',newList);
        setClassList(newList);
    } 

    const handleShow = () => setShow(true);
    const deleteClass=classList.filter(e=>e.id === Number(item.id))
    console.log('deleteClass=',deleteClass);

const handleUpdate=(e)=>{
 e.preventDefault();
 history.push(`/instructor/${params.userid}/updateform/${item.id}`);
}

const handleDelete=()=>{

axiosWithAuth().delete(`/api/class/${item.id}`)
.then(res=>{
    console.log('res in delete=',res)
    handleShow();
    // const newList=classList.filter(e=>e.id !== item.id)
    // console.log('newList in delete=',newList);
    // setClassList(newList);
})  
.catch(err=>{
    console.log('err in delete',err)
})
}

const handleEnrolled=(e)=>{
 e.preventDefault();
 history.push(`/instructor/${params.userid}/enrolled/${item.id}`);
}
return(
    <>
    {show ?
    <Modal show={show} onHide={handleClose} 
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
        </Modal.Footer>
    </Modal> :
    <div className="ins_classes">
        <Card className="ins_classcard">
        <CardTitle tag="h5">{item.class_name} in Anywhere Fitness!</CardTitle>
        <CardSubtitle><MdFitnessCenter/>Type:{item.class_type}</CardSubtitle>
        <CardBody>
        <IconContext.Provider value={{style:{ color: "rgb(117, 239, 255)",fontSize: '25px'}}}>
           <CardText>  <GiWeightLiftingUp/><b><i>Intensity:</i></b> {item.class_intensity}</CardText>
         
             <CardText><FaMapMarker className="mr-2"/>{item.class_location}</CardText>
            
             <CardText className="mr-2"> <FaRegCalendar className="mr-2"/>{item.start_time.slice(0,10)} 

              <FaClock className="mr-2 ml-2"/> {item.start_time.slice(11)}</CardText>

             <CardText><GiDuration className="mr-2"/><i> Duration:</i>{item.class_duration}</CardText>
                         
             <CardText><FaUserFriends className="mr-2"/><i> Max Class Size:{item.class_max_size}</i></CardText>
             </IconContext.Provider>
             <CardSubtitle>Click to view Clients Enrolled for this class <Button className="enrolled" onClick={handleEnrolled}>Clients Enrolled</Button></CardSubtitle>
             
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