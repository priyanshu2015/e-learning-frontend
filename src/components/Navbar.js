import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import '../css/Navbar.css'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className="navbar">
                <div class="navbar-container">
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <Link to="/" className="navbar-logo">
                        LetsProgramify
                </Link>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            {!button && <i class="fas fa-home"></i>}Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/courses' className='nav-links' onClick={closeMobileMenu}>
                            {!button && <i class="fas fa-book"></i>}Courses
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/blog' className='nav-links' onClick={closeMobileMenu}>
                            {!button && <i class="fas fa-blog"></i>}Blog
                            </Link>
                        </li>
                    </ul>
                    <div class='nav-menu-right'>
                        <i class="fas fa-search"></i>
                        <i class="far fa-bell"></i>
                        <Link to='/login' className='login-link'>
                        {button && <Button buttonStyle="btn--secondary" to="/login">Login</Button>}
                        </Link>
                        <Link to='/signup' className='signup-link'>
                        {button && <Button >Signup</Button>}
                        </Link>
                    </div>
                </div>

            </nav>

        </>
    )
}

export default Navbar
