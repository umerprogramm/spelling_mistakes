import Login from './Login/Login';
import Header from './header/Header';
import { useSelector } from 'react-redux';
import Main2 from './Main2/Main2'
import { useState , useEffect } from 'react';




function App() {




  
  const login = useSelector((state)=>state.ChangeState.login)

  return (
    <div className='app'>
    {
    login==='login' || localStorage.getItem('email') ?
    <>
      
           <Header/>
           <Main2
           />
   
           </>:
           <Login
           />
           
           
           
           
          }

          </div>
  );
}

export default App; 
