import React from 'react'

const Login = () => {
    return (
        <>
            <h1>Welcome Back</h1>
            <form action="" className="form-control">
                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" />
                </div>

                <button className="btn" type="submit">Log In</button>
            </form>
        </>
    )
}

export default Login
