import React from 'react'
import './NavBar.scss'
import { IoHelp } from "react-icons/io5"
import { FaRegBell } from "react-icons/fa";
import { MdOutlineSupport, MdStarBorder } from "react-icons/md";
import ime from '../../img/grapefruit-slice-332-332.jpg'
import {Badge} from "@material-ui/core";

function NavBar(){
    return(
        <div className='navbar-container'>
            <div className='navbar-main-links-container'>
                    <ul className='navbar-main-links'>
                        <li>All Projects</li>
                        <li>My Projects</li>
                        <li>Teams</li>
                        <li style={{borderBottom: '2px solid #24cf5f'}}>Messages</li>
                        <li>Statistics</li>
                        <li>Search</li>
                    </ul>
            </div>
            <div className='navbar-main-personal-settings-container'>
                   <Badge
                        badgeContent={5}
                        max={99}> <button><MdStarBorder/></button>
                   </Badge>
                    <Badge
                        className="notification"
                        badgeContent={3}
                        max={99}>
                        <button>
                            <FaRegBell/>
                        </button>
                    </Badge>
                    <button><IoHelp/></button>
                    <button><MdOutlineSupport/></button>
                    <div>
                        <span>Pavlo Sadivnychyy</span>
                        <img src={ime} alt='Avatar'/>
                    </div>
            </div>
        </div>
    )
}
export default NavBar;