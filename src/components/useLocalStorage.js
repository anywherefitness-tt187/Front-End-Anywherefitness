import {useState} from 'react';

const useLocalStorage=(key,initialValue)=>{
 
const [storedValue,setStoredValue]=useState(()=>{

    const item = window.localStorage.getItem(key);
    //if localstorage exist and save it as storedValue state
    return item ? JSON.parse(item) : initialValue
})
//setter function for state
const setValue=(value)=>{

setStoredValue(value);//save state
//set value to localStorage using the key that was passed into the hook
window.localStorage.setItem(key,JSON.stringify(value))
}
//return
return [storedValue,setValue];
}
export default useLocalStorage;

