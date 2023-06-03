import React, { useContext, useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import { AdminAuthContext } from '../../store/AdminContext'



import { FirebaseContext } from '../../store/FirebaseContext'
import './AdminDashboard.css'
function AdminDashboard() {

  
 
    const history = useHistory()
    const {firebase} = useContext(FirebaseContext)


    const deleteUser =  (docid,id)=>{
      
     
     firebase.firestore().collection('users').doc(docid).delete().then(()=>{
      firebase.auth().deleteUser(id).then(()=>{
        history.push('/adminDashboard')
      }).catch((err)=>{
        console.log(err)
      })
      
     })
    }



    const EditUser = (id)=>{
      history.push("/edit?docId="+id)
    }
    const[allusers,setAllusers] = useState([])
    useEffect(()=>{
        firebase.firestore().collection('users').get().then((snap)=>{
          const alluser = snap.docs.map((user)=>{
            return {
                ...user.data(),
                docId:user.id

            }
 
          })
      
          setAllusers(alluser)
        })
      })

  return (
    <div>
<table className="table container col-11 m-auto">
		<thead className="thead-dark">
			<tr>
				<th scope="col">Sno.</th>
				<th scope="col">Name</th>
				
				<th scope="col">Phone</th>
                <th scope="col">Action</th>
				
				
			</tr>
		</thead>
		<tbody>
            {

                allusers.map((user,index)=>{

                  return  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.Phone}</td>
                    


                    <td >
                    <button className='btn-danger' onClick={()=>deleteUser(user.docId,user.id)}>Delete</button> 
                    &nbsp;&nbsp;
                    <button className='btn-primary' onClick={()=>EditUser(user.docId)}>Edit</button> 
                  
                    </td>
                    </tr>

                })

                       

            }
			

  </tbody>
</table>
    </div>
  )
}

export default AdminDashboard
