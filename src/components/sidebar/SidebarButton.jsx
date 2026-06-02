import React, { use } from 'react'
import './sidebarButton.css'
import { Link,useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'

export default function SidebarButton(props) {
  const location = useLocation();

  const isActive = location.pathname === props.to;
  
  const activeClass = isActive ? 'btn-body active' : 'btn-body';
  
  return (
  <div>
    <Link to={props.to} className={`sidebar-button ${activeClass}`}>
        <div className={activeClass} >
          <IconContext.Provider value={{ size: '40px' ,className:'btn-icon'}}>
            {props.icon}
            <p className='btn-title'>{props.title}</p>
          </IconContext.Provider>
        </div>
    </Link>
  </div>
 

  )
}
