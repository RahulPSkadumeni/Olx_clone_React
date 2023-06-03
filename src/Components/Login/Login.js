import React, {  useContext, useState } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'

function Login() {
  const history = useHistory()
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const {firebase} = useContext(FirebaseContext)

  
  const formhandle = (e)=>{
   e.preventDefault()
   firebase.auth().signInWithEmailAndPassword(email,pass).then(()=>{
    history.push('/')
   }).catch((e)=>{alert(e.message)})
  
    
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={formhandle}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
            history.push('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
