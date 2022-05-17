import img from '../../img/user.png';
import { IoIosMore } from '@react-icons/all-files/io/IoIosMore';
import React, { useEffect, useRef, useState } from 'react';
import './ChatItem.scss';
import axios from 'axios';
import { getDispatch, useGlobal } from 'reactn';
import classNames from 'classnames';
import { useStateIfMounted } from 'use-state-if-mounted';
import moment from 'moment';
import { isEmpty } from 'lodash/lang';

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

  const [important, setImportant] = useState(true);
  const [active, setToActive] = useState();
  const [lastMessage, setLastMessage] = useStateIfMounted({});
  const [friendData, setFriendData] = useState({})
  const buttonRef = useRef(null);

  useEffect(() => {
    const friendInfo = item.user_info.find((item) => item._id !== user?._id);
    setFriendData(friendInfo)
    setLastMessage(item.message[item.message.length - 1])
  }, [item])

  useEffect(() => {
    const res = activeUsers.find((item) => item.userId === friendData?._id);
    setToActive(res);
  }, [activeUsers, friendData]);

  function useOutsideButtonClick(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setImportant(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }
  useOutsideButtonClick(buttonRef);

  if(isEmpty(friendData)){
    return null;
  }
  return (
    <div className='main'>
    <div onClick={() => defineActiveChat(item)} className={classNames('chats', activeChat?._id === item._id ? 'active' : null)}>
      <div className="chats-image">
        <img src={friendData.file ? friendData.file : img} alt="Avatar" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
      </div>
      <div className="chats-data">
        <div className="first">
          <p>{friendData.name && friendData.surname ? `${friendData.name} ${friendData.surname}` : ''}</p>
          <button onClick={(e) => {
            e.stopPropagation()
            setImportant(false);
          }}
          >
            <IoIosMore />
          </button>
        </div>
        <div className="second">
            <p className='message-text'>{lastMessage ? lastMessage?.type === 'file' ? lastMessage.file.toString().replace('uploads/', '') : lastMessage?.text : 'No messages yet'}</p>
            <p className='message-time'>{lastMessage ? moment(lastMessage.createdAt).format('HH:mma') : ""}</p>
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
