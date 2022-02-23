import img from '../../img/user.png';
import './Message.scss';
import moment from 'moment';
import { useGlobal } from 'reactn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateIfMounted } from 'use-state-if-mounted';
import Image from '../Image';
import FileDownload from 'js-file-download'
import fileImage from '../../img/file.png'

function Message({ item, own }) {
  const blob = new Blob([item.file], {type: item.type})

  const [friend, setFriend] = useState({})

  const download = (e) => {
    const itemName = item.fileName ? item.fileName : item.file.toString().replace("uploads/", "")
    axios({
      url: '/fileDownload/' + itemName,
      method: "GET",
      responseType: 'blob'
    })
      .then((res) => {
        FileDownload(res.data, itemName)
      })
  }

  useEffect(() => {
    item.user_info?.map((user) => {
      if(user._id === item.sender){
        setFriend(user)
      }
    })
  }, [item])

  return (
    <div className="chat-container">
      <div className="chat-box chatContainerScroll">
        {item.type === 'text' ?
          own
            ? (
              <>
                <div className="chat-right">
                  <div className='mark'/>
                  <div className="chat-text"><p>{item.text}</p></div>
                  <div className="chat-avatar">
                    <img src={item.user_info[0].file ? item.user_info[0].file : img} alt="Retail Admin" />
                  </div>
                </div>
                <div className="date-right"><p>{moment(item.createdAt).format('HH:mm a')}</p></div>
              </>
            )
            : (
              <>
                <div className="chat-left">
                  <div className='mark'/>
                  <div className="chat-avatar">
                    <img src={friend.file ? friend.file : img} alt="Retail Admin" />
                  </div>
                  <div className="chat-text"><p>{item.text}</p></div>
                  <p>{item.date}</p>
                </div>
                <div className="date-left"><p>{moment(item.createdAt).format('HH:mm a')}</p></div>
              </>
            ) :
          own
            ? (
              <>
                <div className="chat-right-file">
                  <div className='options'>
                    <div >
                      <p className='name-of-file-right'>{typeof item.file === 'string' ? item.file.toString().replace("uploads/", "") : item.fileName?.toString()}</p>
                    </div>
                    <div>
                      <p onClick={(e) => download(e)} className='download-file-right'>Download</p>
                    </div>
                  </div>
                  <div className='file'>{typeof item.file === 'string' ? <img src={item.file || fileImage} alt='Image'/> :
                  <Image blob={blob} fileName={item.filename}/>}</div>
                  <div className="chat-avatar">
                    <img src={friend.file ? friend.file : img} alt="Retail Admin" />
                  </div>
                </div>
                <div className="date-file-right"><p>{moment(item.createdAt).format('HH:mm a')}</p></div>
              </>
            )
            : (
              <>
                <div className="chat-left-file">
                  <div className="chat-avatar">
                    <img src={friend.file ? friend.file : img} alt="Retail Admin" />
                  </div>
                  <div className='file'>
                    {typeof item.file === 'string' ? <img src={item.file || fileImage} alt='Image'/> :
                      <Image blob={blob} fileName={item.filename}/>}
                  </div>
                  <div className='options'>
                    <div>
                      <p className='name-of-file-left'>{typeof item.file === 'string' ? item.file.toString().replace("uploads/", "") : item.fileName?.toString()}</p>
                    </div>
                    <div>
                      <p onClick={(e) => download(e)} className='download-file-left'>Download</p>
                    </div>
                  </div>
                </div>
                <div className="date-file-left"><p>{moment(item.createdAt).format('HH:mm a')}</p></div>
              </>
            )
        }
      </div>
    </div>

  );
}

export default Message;
