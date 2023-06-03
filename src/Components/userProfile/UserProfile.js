import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext'
import Header from '../Header/Header'
import './UserProfile.css'

function UserProfile() {
  const [image,setImage] = useState('')
  const [hi,setHi] = useState()
  const {firebase} = useContext(FirebaseContext)
  const refobj = useRef();

  const {user} =  useContext(AuthContext)

  const imagechange = ()=>{
    refobj.current.click()
  }

  
    useEffect(()=>{
      const u = user.uid

      

      firebase.firestore().collection('users').where("id","==",u).get().then((response)=>{
        response.forEach(element => {
          setHi({docID:element.id,...element.data()})
        })
       
      })
     

      console.log(hi)
    
    },[image])

   
   
  return (
   <div>

<Header />

     
         <card>
         


     

        <div className="centerDiv">

      


{hi && hi.img? 

<div>

<input ref={refobj}  type="file" style={{display:"none"}} 
         onChange ={(e)=>{
          console.log(e.target.files)
          console.log("its comming over herer erererererere")
           setImage(e.target.files[0])

           setTimeout(() => {


            console.log(image)
            firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
              ref.getDownloadURL().then((url)=>{
               console.log(url)
                firebase.firestore().collection("users").doc(hi.docID).update({img:url}).then(() => {
                  toast.success("Document successfully written!");
              });
              
              })
            })


            
           }, 1000);
          
           }
          }
       
           />

<button className="btn" onClick={imagechange}><i className="fa fa-folder"></i><small> edit image</small></button> <br /> <br />
<img alt="photo" width='260px'height='180px' src={image ? URL.createObjectURL(image) : hi.img}></img>

</div>


:




image?
     <div>

         <input ref={refobj}  type="file" style={{display:"none"}} 
                  onChange ={(e)=>{
                    console.log(e.target.files)
                    console.log("its comming over here")
                    setImage(e.target.files[0])
                    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
                      ref.getDownloadURL().then((url)=>{
                       
                        firebase.firestore().collection("users").doc(hi.docID).set({img:url,...hi}).then(() => {
                          toast.success("Document successfully written!");
                      });
                      
                      })
                    })
                    }
                   }
                
                    />

        <button className="btn" onClick={imagechange}><i className="fa fa-folder"></i><small> edit image</small></button> <br /> <br />
        <img alt="photo" width={image ? '260px' : '0'}height={image ? '180px' : '0'} src={image ? URL.createObjectURL(image) : ''}></img>
      
        </div>


        :


        <div className="image-placeholder">
            <input type="file" 
                  onChange ={(e)=>{
                    console.log("its comming")
                    setImage(e.target.files[0])
                    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
                      ref.getDownloadURL().then((url)=>{

                        firebase.firestore().collection("users").doc(hi.docID).set({img:url,...hi}).then(() => {
                          toast.success("Document successfully written!");
                      });
                        
                      })
                    })
                    }
                   } />
        
         </div>
}

        
            {hi &&  <h3>Name : {hi.name}</h3>}
            <br />
            {hi && <h3>Phone : {hi.Phone}</h3>  }
            <br />
          
        </div>
      </card>
    
   </div>
  )
}

export default UserProfile
