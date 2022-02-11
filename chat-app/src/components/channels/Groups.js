import {IoMdAdd} from "@react-icons/all-files/io/IoMdAdd";
import React from "react";
import './Groups.scss'
import {useGlobal} from "reactn";
import Modal from '../Modal/Modal'
import AddGroupForm from "../Forms/AddGroupForm";

function Groups({getGroups, groups, defineActiveChat, allUsers, getUsers}){

    const [user] = useGlobal('user')

    return (
        <div className="groups">
            <div className='groups-list-header'>
                <p>Group channels</p>
                <button onClick={() => {
                    Modal.open({
                        component: (<AddGroupForm getUsers={getUsers} allUsers={allUsers} getGroups={getGroups} user={user}/>),
                        title: 'Add Group'
                    })
                }}><IoMdAdd/></button>
            </div>
            <ul className='groups-list'>
                {
                    groups?.map((opt) => (
                        <li key={opt._id} onClick={() => {
                            defineActiveChat(opt)
                        }}>
                            <p>#{opt.name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Groups;