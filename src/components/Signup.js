import React, { useEffect, useState} from 'react'
import { Button } from './Button';
import '../css/Signup.css' 
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    //const history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem('user-info')){
    //         history.pushState("/add")
    //     }
    // }, []);
    async function signup(){
        console.warn(name, email, phone, password);
        let item={name, email, phone, password};
        let result = await fetch("http://localhost/e-learning-platform/api/signup.php",{
            method:'POST',
            mode: 'cors',
            headers:{
                "Content-Type":"application/json",
                "Accept":'application/json'
            },
            body: JSON.stringify(item),
        });
        result = await result.json();
        alert(result["message"])
        window.location.replace("/login"); 
        //history.push("/add");

    }
    return (
        <>
        <div class="container">
            <h1>Lets Get Started</h1>
              <form action="" className="form-control">
                <div>
                    <label htmlFor="username">Name*</label>
                    <input type="text" name="name" onChange={(e)=>setName(e.target.value)} id="name" />
                </div>

                
                <div>
                    <label htmlFor="email">Email*</label>
                    <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} id="email" />
                </div>

                
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="number" name="phone" onChange={(e)=>setPhone(e.target.value)} id="phone" />
                </div>

                <div>
                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} id="password" />
                </div>

                <Button onClick={signup} className="btn" type="button">Register</Button>
            </form>
        </div>
        </>
    )
}

export default Signup
