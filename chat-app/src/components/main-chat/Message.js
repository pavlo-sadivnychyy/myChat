import img from '../../img/user.png';
import './Message.scss';
import moment from 'moment';
import { useGlobal } from 'reactn';
import { useEffect } from 'react';
import axios from 'axios';
import { useStateIfMounted } from 'use-state-if-mounted';
import Image from '../Image';
import FileDownload from 'js-file-download'

function Message({ item, own }) {
  const [sender, setSender] = useStateIfMounted({});
  const blob = new Blob([item.file], {type: item.type})

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

  useEffect(async () => {
    await axios.get(`/users/${item?.sender}`)
      .then((res) => {
        if (res.status === 200) {
          setSender(res.data);
        }
      });
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
                  <div className="chat-text"><p>{item.text}</p></div>
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
                  <div className="chat-text">{item.text}</div>
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
                      <p onClick={(e) => download(e)} className='download-file-right'>Download</p>
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
