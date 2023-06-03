import React, { useContext, useEffect,useState } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, useHistory} from 'react-router-dom'
import Post from './store/PostContext'
import { ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login'
import {AuthContext, FirebaseContext} from './store/FirebaseContext';
import { AdminAuthContext} from './store/AdminContext';
import AdminLogin from './Components/AdminLogin/AdminLogin';

import Create from './Pages/Create';
import View from './Pages/ViewPost'

import AdminHome from './Pages/AdminHome';
import AdminAdds from './Pages/AdminAdd'
import UserProfile from './Components/userProfile/UserProfile';

import {AuthContextProvider} from './store/AdminContext';





function App() {
  const history = useHistory()

  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  const{currentUser} = useContext(AdminAuthContext)

  

 
  const AdminLoginCheck=({children})=> currentUser ? children : <Redirect to="/admin"/>

  


  useEffect (()=>{
    
     firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
     })
}) 


  return (
    <div>
      <ToastContainer position='top-center'/>
      <Post>
      <Router>
        <Route exact path="/">
           <Home />
        </Route>


      <Route  path="/signup">
         <Signup/>
      </Route>


      <Route  path="/login">
          <Login/>
      </Route>


      <Route  path="/sellform">
       <Create/>
      </Route>

     
      <Route  path="/view">
      <View/>
      </Route>

      <AuthContextProvider>
      <Route exact path="/admin">
      <AdminLogin/>
      </Route>
      </AuthContextProvider>


      <AuthContextProvider>
      <Route  path="/adminDashboard">
      <AdminLoginCheck>
      <AdminHome/>
      </AdminLoginCheck>
      </Route>
      </AuthContextProvider>

      <AuthContextProvider>
      <Route path="/edit">
      <AdminLoginCheck>
      <AdminAdds/>
      </AdminLoginCheck>
      </Route>
     
      </AuthContextProvider>

      <Route path="/profile">
      <UserProfile/>
      </Route>

      </Router>
      </Post>
    </div>
  );
}

export default App;
