import img from '../../img/user.png';
import './Message.scss';
import moment from 'moment';
import { useGlobal } from 'reactn';
import { useEffect } from 'react';
import axios from 'axios';
import { useStateIfMounted } from 'use-state-if-mounted';
import Image from '../Image';

function Message({ item, own }) {
  const [sender, setSender] = useStateIfMounted({});
  const blob = new Blob([item.file], {type: item.type})

  function download(arrayBuffer, type) {
    if(typeof item.file !== 'string'){
      const blob = new Blob([arrayBuffer], { type: type });
      return URL.createObjectURL(blob);
    }else {
      return item.file
    }
  }


  useEffect(async () => {
    await axios.get(`/users/${item?.sender}`)
      .then((res) => {
        if (res.status === 200) {
          setSender(res.data);
        }
      });
    console.log(item.fileName)
  }, [item]);

  const [user] = useGlobal('user');
  return (
    <div className="chat-container">
      <div className="chat-box chatContainerScroll">
        {item.type === 'text' ?
          own
            ? (
              <>
                <div className="chat-right">
                  <div className='mark'/>
                  <div style={{backgroundColor: '#1b76ed'}} className="chat-text">{item.text}</div>
                  <div className="chat-avatar">
                    <img src={sender.file ? sender.file : img} alt="Retail Admin" />
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
                    <img src={sender.file ? sender.file : img} alt="Retail Admin" />

                  </div>
                  <div style={{backgroundColor: '#ffffff', color: 'black'}} className="chat-text">{item.text}</div>
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
                    <div>
                      <p className='name-of-file-right'>{item.file.toString().replace("uploads/", "")}</p>
                    </div>
                    <div>
                      <a href={download(item.file, item.type)} download className='download-file-right'>Download</a>
                    </div>
                  </div>
                  <div className='file'>{typeof item.file === 'string' ? <img src={item.file} alt='Image'/> :
                  <Image blob={blob} fileName={item.filename}/>}</div>
                  <div className="chat-avatar">
                    <img src={sender.file ? sender.file : img} alt="Retail Admin" />
                  </div>
                </div>
                <div className="date-file-right"><p>{moment(item.createdAt).format('HH:mm a')}</p></div>
              </>
            )
            : (
              <>
                <div className="chat-left-file">
                  <div className="chat-avatar">
                    <img src={sender.file ? sender.file : img} alt="Retail Admin" />
                  </div>
                  <div className='file'>
                    {typeof item.file === 'string' ? <img src={item.file} alt='Image'/> :
                      <Image blob={blob} fileName={item.filename}/>}
                  </div>
                  <div className='options'>
                    <div>
                      <p className='name-of-file-left'>{typeof item.file === 'string' ? item.file.toString().replace("uploads/", "") : item.fileName?.toString()}</p>
                    </div>
                    <div>
                      <a  href={download(item.file, item.type)} className='download-file-left' download>Download</a>
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
