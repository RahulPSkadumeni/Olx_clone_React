import React, { useContext, useState } from 'react'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import './AdminLogin.css'
import { toast } from 'react-toastify'
import { AdminAuthContext } from '../../store/AdminContext';
import { useHistory } from 'react-router-dom';
function AdminLogin() {
  const[admin,setAdmin] = useState();
  const[pass,setPass] = useState();
  const history = useHistory();
  const {dispatch} = useContext(AdminAuthContext)

  const adminLogin =()=>{
    if(!admin || !pass){
     toast.error("fill the field")
    }else if(admin != "admin@gmail.com"){
      toast.error("not allowed")
    }else if(pass != 123456){
      toast.error("not allowed")
    }else{
      dispatch({
        type:"LOGIN",
        payload:admin
      })
    
        history.push("/adminDashboard")
     
    }
   
  }
  return (
    <section>
            <form>
                <div className="admin">
                            <button type="button" className="admin-lock" onClick={adminLogin}><i className="fa fa-arrow-right"></i></button>

                            <div className="admin-content">
                                <h2 className="admin-content-header">Admin area</h2>

                                        <div className="form">
                                        <input type="text" className="form-input" placeholder="Login" value={admin} onChange={(e)=>setAdmin(e.target.value)}/>
                                        <input type="password" className="form-input" placeholder="Password" value={pass} onChange={(e=>setPass(e.target.value))}/>
                                        </div>

                            </div>
                </div>
            </form>
    </section>
  )
}

export default AdminLogin
