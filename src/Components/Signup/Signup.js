import React, { useState ,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';

import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [username,setUsername] = useState('')
  const[email,setEmail] = useState('')
  const[phone,setPhone] = useState('')
  const[pass,setPass] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const handleform = (e) =>{
    e.preventDefault()
   firebase.auth().createUserWithEmailAndPassword(email,pass).then((result) =>{
     result.user.updateProfile({displayName:username}).then(()=>{
      firebase.firestore().collection("users").add({
        id:result.user.uid,
        name:username,
        Phone:phone
      }).then(()=>{
        history.push('/login')
      })
     })
   })
   
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="not found"></img>
        <form onSubmit={handleform}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>{
                setUsername(e.target.value)
            }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>{
                setPhone(e.target.value)
            }}
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
            onChange={(e)=>{
                setPass(e.target.value)
            }}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{
            history.push('/login')}}>Login</a>
      </div>
    </div>
  );
}
