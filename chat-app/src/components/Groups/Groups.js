import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';
import React, { useEffect } from 'react';
import './Groups.scss';
import { getDispatch, useGlobal } from 'reactn';
import axios from 'axios';
import Modal from '../Modal/Modal';
import AddGroupForm from '../Forms/AddGroupForm';

function Groups({
  user,
  getGroups,
  groups,
  defineActiveChat,
  allUsers,
  getUsers,
  activeChat
}) {

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="groups">
      <div className="groups-list-header">
        <p>Group channels</p>
        <button onClick={() => {
          Modal.open({
            component: (<AddGroupForm getUsers={getUsers} allUsers={allUsers} getGroups={getGroups} user={user} />),
            title: 'Add Group',
          });
        }}
        >
          <IoMdAdd />
        </button>
      </div>
      <ul className="groups-list">
        {
          groups?.map((opt) => (
            <li
              key={opt?._id}
              onClick={() => {
                if(activeChat?._id !== opt?._id){
                  defineActiveChat(opt);
                }
              }}
            >
              <p style={{color: activeChat?._id === opt?._id ? 'white' : ''}}>
                #
                {opt?.name}
              </p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Groups;
