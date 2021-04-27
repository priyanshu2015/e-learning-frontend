import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import '../css/Navbar.css'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isloginned, setLoginStatus] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    const checkLogin = () => {
        var current = Math.round(Date.now() / 1000);
        console.log(current);
        var user = JSON.parse(localStorage.getItem('user-info'));
        if (user != null) {
            if (current > user.token.exp) {
                setLoginStatus(false);
                localStorage.removeItem('user-info');
                // Validate Token and if error received then remove from cookies
            }
            else {
                setLoginStatus(true);
            }
        }
    }
    console.log(isloginned);

    useEffect(() => {
        checkLogin();
    }, []);



    /* When the user clicks on the button,toggle between hiding and showing the dropdown content */
    const myFunction = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.circle') || event.target.parentNode.matches('.circle')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
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
                            {button && !isloginned && <Button buttonStyle="btn--secondary" to="/login">Login</Button>}
                        </Link>
                        <Link to='/signup' className='signup-link'>
                            {button && !isloginned && <Button >Signup</Button>}
                        </Link>
                        <div class="dropdown">
                            {isloginned && <button class="circle" onClick={myFunction}>PG</button>}
                            {!isloginned && !button && <button class="circle" onClick={myFunction}><i class="fas fa-user"></i></button>}
                            <div id="myDropdown" class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>

                    </div>

                </div>

            </nav>

        </>
    )
}

export default Navbar