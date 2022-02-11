import {IoMdAdd} from "@react-icons/all-files/io/IoMdAdd";
import React from "react";
import './Groups.scss'
import Modal from '../Modal/Modal'
import AddGroupForm from "../Forms/AddGroupForm";

function Groups(){

    const groups = ['design', 'programming', "family"]

    return (
        <div className="groups">
            <div className='groups-list-header'>
                <p>Group channels</p>
                <button onClick={() => {
                    Modal.open({
                        component: (<AddGroupForm />),
                        title: 'Add Group'
                    })
                }}><IoMdAdd/></button>
            </div>
            <ul className='groups-list'>
                {
                    groups?.map((opt) => (
                        <li>
                            <p>#{opt}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Groups;