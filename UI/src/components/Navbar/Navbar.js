import React, { useState } from 'react';
import { Button } from './Button.js';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

function Navbar() {

    const saved = useSelector((state) => state.saved);
    const { savedItems } = saved;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    Intern
            </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link 
                            to='/' 
                            className='nav-links' 
                            onClick={closeMobileMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/aboutus'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            About Us
                        </Link>
                    </li>
                    {
                        userInfo && /*(!(userInfo.isAdmin)==true) && (!(userInfo.isCompany)==true) && */(
                            <li 
                                className='nav-item'
                                
                            >
                                <Link
                                    to='/saved'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Favorites
                                    {
                                        savedItems.length > 0 && (
                                            <span className="badge">{savedItems.length}</span>
                                        )
                                    }
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo ? (
                            <li
                                className='nav-item'
                                
                            >
                                <Link
                                    to="/profile"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    {userInfo.name} 
                                </Link>
                            </li>
                        ) :
                        (
                            <li
                                className='nav-item'
                            >
                               <Button/>
                            </li>
                        )
                    }
                    {
                        userInfo && userInfo.isCompany && (
                            <li
                                className='nav-item'
                            >   
                                <Link 
                                    to="/internshiplist/company"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    CInternships 
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <li
                                className='nav-item'
                            >
                                <Link 
                                    to="/internshiplist"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    AInternships 
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <li
                                className='nav-item'
                            >
                                <Link 
                                    to="/userlist"
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Users 
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </>
    );
}

export default Navbar;

