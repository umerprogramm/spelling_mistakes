import React, { useState , useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './main.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';





export default function Main() {
  const [state ,setstate]  = useState(true)
  const [updatingValue , setupdatingValue] =  useState('')
  const [tellme , setTellme] = useState('')
  const [congratulation , setcongratulations] = useState(false)
  const [showme , setshowme] = useState('')
  const db_score = useSelector((state)=>state.ChangeState.score)
  const [score , setscore] = useState(0)


  const { speak } = useSpeechSynthesis();
  useEffect(() => {
   const getData = ()=>{

    
    fetch('https://random-word-api.herokuapp.com/word?number=1')
      .then(response => response.json())
      .then(response => {
        console.log(response[0])
        setTellme(response[0])

      })
      .catch(err => console.error(err));


      fetch("http://localhost:5000/get_user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email : localStorage.getItem('email')
        })
    }).then((res) => res.json())
    .then((data) => setscore(data.score))
    .catch((err) => console.log(err))
   }
   getData() 
  }, [congratulation]);

  
  


  const spellingChecker = async ()=>{

         if(updatingValue === ''){
           setstate(false)
         
          }
          else if(updatingValue !== tellme){
            setstate(false)
          }else{
            setstate(true)
            setcongratulations(true)

            fetch("http://localhost:5000/update_score", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                score : score + 100,
                email : localStorage.getItem('email')
              })
          }).then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err))
        
        }
       

      }
      

      
      
      const Speak = ()=>{
        speak({text : tellme })
        setshowme('')
      }




  return (
    <>

      <div id='input_div'>
        {

          congratulation !== false ? 
          <h1 style={{dispaly: 'flex',justifyContent : 'center',alignItems : 'center',color : 'white',marginBottom:'15px'}}>Congratulation 🎉</h1>:
          <>
          {
            showme === '' ?
            <h1 style={{display : 'none'}}>{showme}</h1>:
            <h1 style={{display : 'block'}}  >{showme}</h1>


          }
          <div style={{display : 'flex',justifyContent:'center',alignItems:'center' ,height : "50%"}}>
        <img style={{height : '50%',cursor : 'pointer'}} src='https://static.thenounproject.com/png/1616157-200.png'onClick={ Speak } alt='speak'/>

          </div>
          
        </>
   
        }
        {
              state === false ?
              <div className="alert alert-danger alert-dismissible fade show mx-5" role="alert">
         <strong>wrong spelling!</strong> You are typing wrong spelling
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true" onClick={()=>{setstate(true)}}>&times;</span>
         </button>
         </div>:
            <div style={{display : 'none'}} class="alert alert-danger alert-dismissible fade show mx-5" role="alert">
       <strong>wrong spelling!</strong> You are typing wrong spelling
       <button type="button" className="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true" onClick={()=>{setstate(true)}}>&times;</span>
       </button>
       </div>
        }
   
  <div className='input_container'>
    
    <input  onChange={e =>{setupdatingValue(e.target.value)}}type="text" className='input'/>
<button onClick={spellingChecker}>Check</button>
  </div>

   



    <div class="footer">
      <span>Score : {score} </span>
  <Link  class='Link' to='/top_10'><img src='https://www.svgrepo.com/show/39675/trophy.svg' alt='trophy'/></Link>
</div>
        
  </div>
  </>
  )
}
