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
    <Link to={props.to} className="sidebar-button">
      <div className={activeClass}>
        <IconContext.Provider value={{ size: "30px", className: "btn-icon" }}>
          {props.icon}
        </IconContext.Provider>
        <p className="btn-title">{props.title}</p>
      </div>
    </Link>
  </div>
 

  )
}
