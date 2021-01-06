import axios from 'axios';

export const axiosWithAuth=()=>{
    //get  the token from local storage
    const token=localStorage.getItem('token')
    console.log('axioswithauth token=',token)
return axios.create({
        headers:{
            // authorization: token,
            authorization: `Bearer ${token}`
        },
        baseURL:"https://anywherefitness187.herokuapp.com"//frm backend
    })
}