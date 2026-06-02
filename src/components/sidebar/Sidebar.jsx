import React from 'react'
import './sidebar.css'
import appicon from "../../assets/icons/music.png";
import SidebarButton from './SidebarButton';
import { FaPlayCircle } from "react-icons/fa";
import { TbMusicSearch } from "react-icons/tb";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Link } from 'react-router-dom';








export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <Link to="/online">
      <img src={appicon} 
      className='app-icon'
      alt='icon' />
      </Link>
      <div className='nav-items'>
        <SidebarButton title="play" to="/player" icon ={<FaPlayCircle/>}/>
        <SidebarButton title="search" to="/search" icon ={<TbMusicSearch/>}/>
        <SidebarButton title= "library" to="/library" icon ={<MdOutlineLibraryBooks/>}/>
      </div>
      <SidebarButton />

    </div>
  )
  }
