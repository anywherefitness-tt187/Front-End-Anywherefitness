import axios from 'axios';

export const axiosWithAuth=()=>{
    //get  the token from local storage
    const token=window.localStorage.getItem('token')
return axios.create({
        headers:{
            authorization: token
        },
        baseURL:"http://localhost:5000"//modify to herokko frm backend
    })
}