import img from '../../img/user.png';
import { IoIosMore } from '@react-icons/all-files/io/IoIosMore';
import React, { useEffect, useRef, useState } from 'react';
import './ChatItem.scss';
import axios from 'axios';
import { getDispatch, useGlobal } from 'reactn';
import classNames from 'classnames';
import { useStateIfMounted } from 'use-state-if-mounted';

function ChatItem({
  item,
  getConversations,
  activeChat,
  setTeamActive,
  activeUsers,
  defineActiveChat,
  activeMessages,
  getAllUserImportantConversations
}) {
  const [user] = useGlobal('user');

  const [friend, setFriend] = useStateIfMounted({});
  const [important, setImportant] = useState(true);
  const [active, setToActive] = useState();
  const [lastMessage, setLastMessage] = useStateIfMounted({})

  useEffect(() => {
    axios.get('/messages/' + item._id)
      .then((res) => {
        setLastMessage(res.data[res.data?.length - 1]);
      })
  },[])


  useEffect(() => {
    const res = activeUsers.find((item) => item.userId === friend._id);
    setToActive(res);
  }, [activeUsers, friend]);

  const buttonRef = useRef(null);

  function useOutsideButtonClick(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setImportant(true);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }

  useOutsideButtonClick(buttonRef);

  useEffect(() => {
    const friendId = item.members?.find((id) => id !== user._id);
    axios.get(`/users/${friendId}`)
      .then((res) => {
        setFriend(res.data);
      });
  }, [item]);

  return (
    <div className='main'>
    <div onClick={() => defineActiveChat(item)} className={classNames('chats', activeChat?._id === item._id ? 'active' : null)}>
      <div className="chats-image">
        <img src={friend.file ? friend.file : img} alt="Avatar" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
      </div>
      <div className="chats-data">
        <div className="first">
          <p>{friend.name && friend.surname ? `${friend.name} ${friend.surname}` : ''}</p>
          <button onClick={(e) => {
            e.stopPropagation()
            setImportant(false);
          }}
          >
            <IoIosMore />
          </button>
        </div>
        <div className="second">
          <span>{lastMessage ? lastMessage?.type === 'file' ? lastMessage.file.toString().replace('uploads/', '') : lastMessage?.text : 'No messages yet'}</span>
          <span>15:10 PM</span>
        </div>
      </div>
      <div className={classNames('activity', active ? 'green' : '')} />
    </div>
      <div hidden={important} ref={buttonRef} className="important">
        <button
          onClick={async () => {
            if(activeMessages !== 'Important'){
              await axios.post(`/conversations/updateConv/${item._id}`)
                .then((res) => {
                  if (res.status === 200) {
                    setImportant(true);
                    getDispatch().openSnackbar({
                      open: true,
                      msg: 'Chat added to important',
                      color: 'success',
                    });
                  }
                  if (res.status === 404) {
                    getDispatch().openSnackbar({
                      open: true,
                      msg: 'Something went wrong',
                      color: 'warning',
                    });
                  }
                })
            }else{
              await axios.post(`/conversations/unmarkFromImportant/${item._id}`)
                .then((res) => {
                  if (res.status === 200) {
                    setImportant(true);
                    getAllUserImportantConversations()
                    getDispatch().openSnackbar({
                      open: true,
                      msg: 'Chat removed from important',
                      color: 'success',
                    });
                  }
                  if (res.status === 404) {
                    getDispatch().openSnackbar({
                      open: true,
                      msg: 'Something went wrong',
                      color: 'warning',
                    });
                  }
                })
            }
          }}
        >
          {activeMessages !== 'Important' ? "Mark as important" : "Unmark from important"}
        </button>
        <br />
        <button
          ref={buttonRef}
          onClick={async () => {
            await axios.delete(`/conversations/${item._id}`)
              .then((res) => {
                if (res.status === 200) {
                  setImportant(true);
                  setTeamActive(null);
                  getDispatch().openSnackbar({
                    open: true,
                    msg: 'Chat successfully deleted',
                    color: 'success',
                  });
                  getConversations();
                }
                if (res.status === 404) {
                  getDispatch().openSnackbar({
                    open: true,
                    msg: 'Something went wrong',
                    color: 'warning',
                  });
                }
              });
          }}
        >
          Delete chat
        </button>
      </div>
</div>
  );
}

export default ChatItem;
