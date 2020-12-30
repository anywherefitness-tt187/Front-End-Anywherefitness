import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';


export default function Home() {
    return (
        <>
        <NavBar/>
        
        
        <div className='home'>
            <h1 className='title'>Anywhere Fitness</h1>
            <Link className='home-link' to='/login'>Login</Link>
            <Link className='home-link' to='/signup'>Signup</Link>
        </div>
        </>
        
    )
}