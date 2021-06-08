import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import '../css/Navbar.css'
import axios from 'axios';
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

    var user = JSON.parse(localStorage.getItem('user-info'));


    const checkLogin = () => {
        var current = Math.round(Date.now() / 1000);
        console.log(current);

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

    useEffect(() => {
        checkLogin();
        //login();
    }, []);

    // const [bookList, setBookList] = useState([]);
    
    // const login = async () => {
    //     let loginURL = "http://127.0.0.1:8000/api/login/";
    //     const response = await axios.post(loginURL, { "username": "priyanshugupta", "password": "1234" });
    //     console.log(response);
    // }



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
                            {isloginned && <button class="circle" onClick={myFunction}>{user.token.data.name[0]}</button>}
                            {!isloginned && !button && <button class="circle" onClick={myFunction}><i class="fas fa-user"></i></button>}
                            <div id="myDropdown" class="dropdown-content">
                                {!isloginned && <Link to='/login' className='login-link'>Login</Link>}
                                {!isloginned && <Link to='/signup' className='login-link'>Sign Up</Link>}
                                {isloginned && <Link to='/instructor/mycourses' className='login-link'>Instructor</Link>}
                                {isloginned && <Link to='/myaccount' className='login-link'>My Account</Link>}
                                {isloginned && <Link to='/logout' className='login-link'>Logout</Link>}
                            </div>
                        </div>

                    </div>

                </div>

            </nav>

        </>
    )
}

export default Navbar
