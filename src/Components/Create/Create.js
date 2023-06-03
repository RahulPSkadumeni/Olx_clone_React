import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom';
const Create = () => {
  const history = useHistory()
  const {user} = useContext(AuthContext)
  const{firebase} = useContext(FirebaseContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const date = new Date()
  const  handlesubmit =  ()=>{
       
         if(user!=null){
          firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
            ref.getDownloadURL().then((url)=>{
              firebase.firestore().collection('products').add({
                name,
                category,
                price,
                url,
                userId:user.uid,
                createdAt:date.toDateString()
              })
              history.push("/")
            })
           })
         }else{
          history.push("/login")
         }
         
        
  }
  return (
   
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value = {name}
              onChange ={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value = {category}
              onChange ={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"  value = {price}
              onChange ={(e)=>setPrice(e.target.value)} />
            <br />
         
          <br />
          <img alt="photo" width={image ? '200px' : '0'}height={image ? '200px' : '0'} src={image ? URL.createObjectURL(image) : ''}></img>
         
            <br />
            <input type="file" 
              onChange ={(e)=>{
                
                setImage(e.target.files[0]) 
                }
                } />
            <br />
            <button onClick={handlesubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
