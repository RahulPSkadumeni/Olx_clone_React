import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FirebaseContext } from '../../store/FirebaseContext';
import "./AdminAdd.css"
function AdminAdd() {

  const search = useLocation().search;
  const query = new URLSearchParams(search).get('docId');

  const{firebase} = useContext(FirebaseContext)
  const[edit,setEdit]= useState()

  useEffect(()=>{
    firebase.firestore().collection('users').doc(query).get().then((response)=>{
      setEdit(response.data())
    },[])
  })


   
  const[name,setName]= useState()
  const[phone,setPhone] = useState()
  const history = useHistory()

  const checkform = ()=>{
    if(!name || !phone){
      toast.error("fill the form")
    }else{
      firebase.firestore().collection("users").doc(query).update({
        "name": name,
        "Phone":phone
      }).then(()=>{
        toast.success("verygood")
      }).catch(()=>{
        toast.error("something went wrong")
      })
   
    }
  }
  return (
    <div  >
      { edit &&

          <div className="wrapper">
          <div className="container">
          <input type="text" placeholder={edit.name} id="username"  value={name} onChange={(e)=>setName(e.target.value)} />
          <input type="number" placeholder={edit.Phone} id="password" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          <button id="submit" onClick={checkform}>Submit</button>
          <button id='submit' onClick={()=>history.push("/adminDashboard")}>Back</button>

          </div>
          </div>


      }
         

       
      
    </div>
  )
}

export default AdminAdd
