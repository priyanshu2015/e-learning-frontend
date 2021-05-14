import React, { useEffect, useState } from 'react'
import { Button } from './Button';
import '../css/Login.css'
// import  { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    useEffect(() => {
        validateToken()
    }, []);
    async function validateToken() {
        var user = JSON.parse(localStorage.getItem('user-info'));
        if (user != null) {
            var current = Math.round(Date.now() / 1000);
            if (user.token.exp < current) {
                localStorage.removeItem('user-info');
            }
            else{
                window.location.replace("/");
            }
        }
    }

    async function login() {
        //console.warn(email, password);
        let item = { email, password };
        let result;
        fetch(window.apiurl + "login.php", {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item),
        }).then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        }).then(data => {
            result = data;
            console.log(data);
            localStorage.setItem('user-info', JSON.stringify(data));
            alert(data.message);
            window.location.replace("/");    // Reload full page
            //history.push('/');
            //<Link to='/' className='login-link'></Link>   // will not reload full page just load the components on that path
        }).catch(async (err) => {
            let x = await err.json();
            console.log(x.message);
            alert(x.message);
        });
    }
    return (
        <>
            <div class='container'>
                <h1>Welcome Back</h1>
                <form action="" className="form-control">

                    <div>
                        <label htmlFor="email">Email*</label>
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter Your Email" />
                    </div>

                    <div>
                        <label htmlFor="password">Password*</label>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter Your Password" />
                    </div>

                    <Button onClick={login} className="btn" type="button">Log In</Button>
                </form>
            </div>
        </>
    )
}

export default Login
