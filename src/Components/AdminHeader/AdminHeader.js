import React,{useContext, useEffect, useState}from 'react'
import { useHistory } from 'react-router-dom';
import { AdminAuthContext } from '../../store/AdminContext'
import "./AdminHeader.css"


function AdminHeader() {

  const history = useHistory()

  const {dispatch } = useContext(AdminAuthContext);
    
  return (
    <div className='header'>
        <p className='logo'>Admin</p>
        <div className='header-right'>
  
            
                <p className='active' onClick={()=>{
                  dispatch({
                    type:"LOGOUT"
                  })
                  history.push("/admin")
                  
                }}>
                Logout
                </p>
               
          

        </div>


      
    </div>
  )
}

export default AdminHeader
