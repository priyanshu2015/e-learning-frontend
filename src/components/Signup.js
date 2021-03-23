import React from 'react'

const Signup = () => {
    return (
        <>
            <h1>Lets Get Started</h1>
              <form action="" className="form-control">
                <div>
                    <label htmlFor="username">Fullname</label>
                    <input type="text" name="username" id="username" />
                </div>

                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                </div>

                
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="number" name="phone" id="phone" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" />
                </div>

                <button className="btn" type="submit">Register</button>
            </form>
        </>
    )
}

export default Signup
