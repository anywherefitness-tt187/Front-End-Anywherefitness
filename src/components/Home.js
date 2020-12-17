import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        
        
        
        
        <div className='home'>
            <h1 className='title'>Anywhere Fitness</h1>
            <Link className='home-link' to='/user'>User signup/login</Link>
            <Link className='home-link' to='/instructor'>Instructor signup/login</Link>
        </div>
    )
}