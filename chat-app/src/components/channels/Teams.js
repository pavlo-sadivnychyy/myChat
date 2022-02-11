import React from "react";
import './Teams.scss'
import {MdPersonAdd} from "@react-icons/all-files/md/MdPersonAdd";
import Modal from "../Modal/Modal";
import AddTeamForm from "../Forms/AddTeamForm";

function Teams({getTeams,teams, getConversationsOfActiveTeam, setTeamActive}) {

    return (
        <div className='teams'>
            <div className='teams-list-header'>
                <p>Teams</p>
                <button onClick={() => {
                    Modal.open({
                        component: (<AddTeamForm getTeams={getTeams}/>),
                        title: 'Add Team'
                    })
                }}><MdPersonAdd/></button>
            </div>
            <ul className='teams-list'>
                {
                    teams?.map((opt, key) => (
                        <li onClick={() => {
                            setTeamActive(opt)
                            getConversationsOfActiveTeam(opt)
                        }} key={key}>
                            <p>#{opt.name}</p>
                            <p>{opt.conversations.length}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Teams;
