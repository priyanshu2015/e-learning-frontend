import React, { useEffect, useState} from 'react'
import { Button } from './Button';
import '../css/Login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem('user-info')){
    //         history.pushState("/add")
    //     }
    // }, []);
    async function login(){
        console.warn(email, password);
        let item={email, password};
        let result = await fetch("http://localhost/e-learning-platform/api/login.php",{
            method:'POST',
            mode: 'cors',
            headers:{
                "Content-Type":"application/json",
                "Accept":'application/json'
            },
            body: JSON.stringify(item),
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        //history.push("/add");

    }
    return (
        <>
        <div class='container'>
            <h1>Welcome Back</h1>
            <form action="" className="form-control">
                
                <div>
                    <label htmlFor="email">Email*</label>
                    <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Enter Your Email" />
                </div>

                <div>
                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="Enter Your Password" />
                </div>

                <Button onClick={login} className="btn" type="button">Log In</Button>
            </form>
        </div>
        </>
    )
}

export default Login
