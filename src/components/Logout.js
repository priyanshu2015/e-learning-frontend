import React, { useEffect, useState } from 'react'
import { Button } from './Button';
import '../css/Login.css'
// import  { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"
const Logout = () => {

    useEffect(() => {
        validateToken()
    }, []);
    async function validateToken() {
        var user = JSON.parse(localStorage.getItem('user-info'));
        if (user != null) {
            var current = Math.round(Date.now() / 1000);
            if (user.token.exp < current) {
                localStorage.removeItem('user-info');
                window.location.replace("/");
            }
            else{
                localStorage.removeItem('user-info');
                window.location.replace("/");
            }
        }
        else{
            window.location.replace("/");
        }
    }

    
    return (
        <>
        
        </>
    )
}

export default Logout
