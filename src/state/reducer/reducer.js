const initialize = {
    login : 'Nothing',
    score : 0
 
}
 const ChangeState =  (state=initialize,action )=>{
  
      if(action.type === "CHANGE"){
        return {
               login : state.login = action.login,
               score : state.login = action.score
              
          }
        }

      else{
          return {  
            
            login : state.login,
            score : state.score
          
        }
      }


}
 

export  default ChangeState