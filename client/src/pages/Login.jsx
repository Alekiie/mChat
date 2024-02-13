import React from 'react'
import '../styles/register.css'
import { Link } from 'react-router-dom' ;

function Login() {
  return (
     <div className='container'>
      <section className='form-section'>
        <form>
        <h1>M-Chat Login</h1>
          <input type="email" name="email" id="email" placeholder='Email'/>
          <input type="password" name="password" id="password"  placeholder='Password'/>
          <input type="submit" value="Login" />

          <p>Don't have an account?&nbsp;&nbsp;<Link to='/'>Register</Link></p>
        </form>
      </section>
    </div>
  )
}

export default Login