import React from 'react'
import './NavBar.scss'
import { IoHelp } from "react-icons/io5"
import { FaRegBell } from "react-icons/fa";
import { MdOutlineSupport, MdStarBorder } from "react-icons/md";
import ime from '../../img/grapefruit-slice-332-332.jpg'
import {useEffect, useGlobal} from "reactn";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {Badge} from "@material-ui/core";

function NavBar(){
    const history = useHistory();
    const [user] = useGlobal('user');
    const [cookies, , removeCookie] = useCookies(['jwt', 'connect.sid']);
    const [not] = useGlobal('not');
     function exit(){
        if (cookies.jwt) {
            removeCookie("jwt");
            history.push("/login");
            window.location.reload();
        }
    }

    useEffect(() => {
        console.log(not)
    }, [not])
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
                        badgeContent={not?.length || null}
                        max={99}>
                        <button>
                            <FaRegBell/>
                        </button>
                    </Badge>
                    <button><IoHelp/></button>
                    <button onClick={() => exit()}><MdOutlineSupport/></button>
                    <div>
                        <span>{`${user?.name} ${user?.surname}`}</span>
                        <img src={user.file ? user.file : ime} alt='Avatar'/>
                    </div>
            </div>
        </div>
    )
}
export default NavBar;