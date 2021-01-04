import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className='navbar'>
            <ul>
                <h1 className='title'>Anywhere Fitness</h1>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/about'>About Us</Link>
                <Link className='link' to='/contact'>Contact</Link>    
            </ul>
        </div>
    )
}