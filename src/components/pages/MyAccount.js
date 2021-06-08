import React from 'react';
import { useEffect, useState } from 'react';

function MyAccount(props) {
    useEffect(async() => {
        await validateToken();
    }, []);

    var user = JSON.parse(localStorage.getItem('user-info'));

    async function validateToken() {
        if (user != null) {
            var current = Math.round(Date.now() / 1000);
            if (user.token.exp < current) {
                localStorage.removeItem('user-info');
                window.location.replace("/login");
            }
        }
        else {
            window.location.replace("/login");
        }
    }
    
    return (
        <>
        <div className="course-container">
        <h1>My Account</h1>
            <p>Name: {user.token.data.name}</p>
            <p>Phone: {user.token.data.phone}</p>
            <p>Email: {user.token.data.email}</p>
        </div>
        </>
    );
}

export default MyAccount;