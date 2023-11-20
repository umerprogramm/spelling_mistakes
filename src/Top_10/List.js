import React from 'react'
import './top_10.css'
import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();


export default function List(props) {

  return (
    <>
 
        <ul>
          <li ><img src={generator.generateRandomAvatar()}/><li>{props.displayName} <span className='score'>Score : {props.score}</span></li></li>
         

        </ul>
  </>
  )
}
