import React from 'react'
import './top_10.css'
import List from './List'
import { useEffect , useState} from 'react'
import * as Realm from "realm-web";


export default function Top_10() {
  const [state ,setstate] =  useState([])
  useEffect(  () => {

    fetch('http://localhost:5000/all_user')
    .then(response => response.json())
    .then(data => setstate(data))
    .catch(err => console.error(err));
  }, []);
  
  return (
    <div>
    <pre style={{color : 'white'}}>TOP 10 List</pre>
{
    state.length === 0 ?( <h1 style={{display : 'flex',justifyContent : 'center',color : 'white'}}>Loading...</h1>):
    state.map(value =>{
      return(
        <>
        {
       <List
       key = {value._id}
       displayName = {value.username}
       score = {value.score}
       />
        }
       </>

      )
        })
  
      }

      
      
    
   
   
    </div>
  )
}
