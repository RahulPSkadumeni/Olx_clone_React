import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';

import './View.css';
function View() {
  const [userDetails,setUserDetails] = useState()
  const{postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const {userId} = postDetails
    firebase.firestore().collection('users').where("id","==",userId).get().then((response)=>{
      console.log(response)
      response.forEach(element => {
        setUserDetails(element.data())
      });
      
    })
  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">                           
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.Phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
