import React, { useEffect, useState } from 'react'
import './loginPage.css'
import { login, getUser } from '../../services/authService'
import NavBar from '../../components/navbar/navbarComponent'

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handelClikc = (e) => {
    e.preventDefault()
    console.log('click')
    login(username, password)
  }
useEffect(() => {
  const user = getUser()
  if(user){
    window.location.href = '/home'
  }
  console.log("user", user);
})

  return (
    <>
    <NavBar />
    <div id="login-form-wrap">
  <h2>Login</h2>
  <form id="login-form" onSubmit={handelClikc}>
    <p>
    <input type="text" 
    id="username" 
    name="username" 
    placeholder="Username" 
    required
    onChange={(e) => setUsername(e.target.value)}
    value={username}

    /><i class="validation"><span></span><span></span></i>
    </p>
    <p>
    <input type="password" 
    id="password" 
    name="password" 
    placeholder="password Address" 
    required 
    onChange={(e) => setPassword(e.target.value)}
    value={password}

    /><i class="validation"><span></span><span></span></i>
    </p>
    <p>
    <input type="submit" id="login" value="Login" />
    </p>
  </form>
  <div id="create-account-wrap">
    <p>Not a member? <a href="/asf">Create Account</a></p>
  </div>
</div>
</>
  )
}

export default LoginPage
