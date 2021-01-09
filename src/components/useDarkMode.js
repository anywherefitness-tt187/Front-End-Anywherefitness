import useLocalStorage from './useLocalStorage';
// import {useEffect} from 'react';

const useDarkMode=(initialValue)=>{
    //Note-useLocalStorage retuns storedValue,setValue
    const [darkModeStatus,setDarkModeStatus]=useLocalStorage('darkmode-status',initialValue)
 
  // If darkModeStatus state is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled =
    typeof darkModeStatus !== 'undefined' ? darkModeStatus : false;
 
    return [enabled,setDarkModeStatus]

}
export default useDarkMode;