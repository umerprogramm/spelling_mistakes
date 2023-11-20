import React from 'react'
import './login.css'
import { auth, provider } from '../firebase/Firebase'
import {  signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { logIn } from '../state/actions/action';
import * as Realm from "realm-web";
import image from './main_picture.png'



export default function Login(props) {


    const Dispatch = useDispatch()

    const {useState , useEffect } = React




     




   

  function SingIn(){
    
    signInWithPopup(auth,provider)
    .then( async (result) => {
            
            localStorage.setItem('login_info' , true)
            const data = {
              name : result.user.displayName,
              email : result.user.email,

            }
             fetch("http://localhost:5000/getinfo_and_check", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then((res) => res.json())
          .then((data) => {
            Dispatch(logIn({login : "login",score :  data.score }))
            localStorage.setItem('email',result.user.email)
          })
          .catch((err) => console.log(err))
          console.log(result.user.displayName);
            
                      
             
         
        }).catch((error) => alert("sorry,you cannot sign in", error));
      
        
          }

        
        return (
          <div className='container'>
            <div className='heading_container'>
            <h1>Spelling Checker</h1>
           <h2> <span style={{color : 'greenyellow'}}>Precision</span>  in Every Letter, Perfection in Every Word: Your Ultimate <span style={{color : 'greenyellow'}}>Spelling Checker</span> </h2>
            <button onClick={SingIn}>Sign In with Google</button>
            </div>
            <img src={image}/>
          
        </div>
        )

}
