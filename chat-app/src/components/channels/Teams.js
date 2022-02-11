import React from "react";
import './Teams.scss'
import {MdPersonAdd} from "@react-icons/all-files/md/MdPersonAdd";
import Modal from "../Modal/Modal";
import AddTeamForm from "../Forms/AddTeamForm";

function Teams() {

    const teams = ['design', 'programming', "family"]

    return (
        <div className='teams'>
            <div className='teams-list-header'>
                <p>Teams</p>
                <button onClick={() => {
                    Modal.open({
                        component: (<AddTeamForm/>),
                        title: 'Add Team'
                    })
                }}><MdPersonAdd/></button>
            </div>
            <ul className='teams-list'>
                {
                    teams?.map((opt, key) => (
                        <li key={key}>
                            <p>#{opt}</p>
                            <p>22</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Teams;
