import React from 'react'
import './player.css'
import { useLocation } from "react-router-dom";


export default function Player() {

  const location = useLocation();

  console.log(location.state);


  return (
    <div className='screen-container'>
      <div className='player-container'>

      </div>
    </div>

  )
}
