import React, {useEffect, useRef, useState} from 'react'
import './MessagePage.scss'
import Channels from "../../components/channels/Channels";
import List from '../../components/chat-list/List'
import FriendInfo from "../../components/profile-info/FriendInfo";
import Chat from "../../components/main-chat/Chat";
import {getDispatch, setGlobal, useGlobal} from "reactn";
import axios from "axios";
import io from 'socket.io-client'
import {useStateIfMounted} from "use-state-if-mounted";
const socket = io.connect("http://localhost:8000")
function MessagePage(){

    const [not] = useGlobal("not")
    const [user] = useGlobal('user');
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useStateIfMounted([]);
    const [teams, setTeams] = useState([]);
    const [groups, setGroups] = useState([]);
    const [notifications, setNotification] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [activeTeam, setActiveTeam] = useState(null)
    const [activeChat, setActiveChat] = useState(null)
    const [activeUsers, setActiveUsers] = useState([])

    useEffect(() => {
        setGlobal({
            not: notifications
        })
    },[notifications, not])

    function setTeamActive(team){
        setActiveTeam(team)
    }
    function defineActiveChat(chat){
        setActiveChat(chat)
    }

   async function getTeams() {
       try{
           await axios.get('/teams/' + user._id)
               .then((res) => {
                   if(res.status === 200){
                       setTeams(res.data)
                   }else{
                       getDispatch().openSnackbar({
                           open: true,
                           msg: "Teams not found",
                           color: "warning",
                       });
                   }
               })
       }catch (err){
           if(err) console.log(err)
       }
    }
   async function getGroups() {
       try{
           await axios.get('/groups/' + user._id)
               .then((res) => {
                   if(res.status === 200){
                       setGroups(res.data);
                   }else{
                       getDispatch().openSnackbar({
                           open: true,
                           msg: "Groups not found",
                           color: "warning",
                       });
                   }
               })
       }catch (err){
           if(err) console.log(err)
       }
    }
    useEffect(() => {
        getTeams()
        getGroups();
        setGlobal({notification: 0})
        socket.emit('activeUser', user)
    },[]);


    async function getConversationsOfActiveTeam(team) {
        const temp = [];
        try{
            if(team){
                for(let i = 0; i < team?.conversations.length; i++ ){
                    await axios.get('conversations/byId/' + team.conversations[i])
                        .then((res) => {
                            if(res.status === 200){
                                res.data.map((item) => temp.push(item))
                            }else{
                                getDispatch().openSnackbar({
                                    open: true,
                                    msg: "Couldn't get conversations",
                                    color: "warning",
                                });
                            }
                        })
                }
                setConversations(temp)
            }
        }catch (err){
            if(err) console.log(err)
        }

    }

    useEffect(async() => {
        updateMessages()
        socket.emit("joinRoom", activeChat?._id)
    },[activeChat])

    async function updateMessages(){
        await axios.get('/messages/' + activeChat?._id)
            .then(res => {
                setMessages(res.data)
            })
    }

    async function getUsers(){
        try{
            await axios.get('/users/all')
                .then((res) => {
                    if(res.status === 200){
                        setAllUsers(res.data)
                    }else{
                        getDispatch().openSnackbar({
                            open: true,
                            msg: "Conversations not found",
                            color: "warning",
                        });
                    }
                })

        }catch (err){
            if(err) console.log(err)
        }
    }

    useEffect(() => {

            socket.on('receiveMessage', (data) => {
                setMessages((list) => [...list, data])
            })
            socket.emit('notification', (data) => {
                console.log(data)
            })

    },[socket])

    async function getAllUserImportantConversations(){
        try{
            await axios.get('/conversations/important/' + user._id)
                .then((res) => {
                    if(res.status === 200){
                        setConversations(res.data)
                    }else{
                        getDispatch().openSnackbar({
                            open: true,
                            msg: "Conversations not found",
                            color: "warning",
                        });
                    }

                })
        }catch (err){
            if(err) console.log(err)
        }
    }

    async function getAllUserConversations(){
        try{
            await  axios.get('/conversations/' + user._id)
                .then((res) => {
                    if(res.status === 200){
                        setConversations(res.data)
                    }else{
                        getDispatch().openSnackbar({
                            open: true,
                            msg: "Conversations not found",
                            color: "warning",
                        });
                    }

                })
        }catch (err){
            if(err) console.log(err)
        }
    }

    useEffect(() => {
        socket.on('listOfActive', (data) => {
            setActiveUsers(data)
        })
    }, [user])

    useEffect( async () => {
        getAllUserConversations()
    },[user, notifications])


    return (
        <div className='main-content'>
            <Channels
                getUsers={getUsers}
                allUsers={allUsers}
                defineActiveChat={defineActiveChat}
                setTeamActive={setTeamActive}
                getTeams={getTeams}
                getGroups={getGroups}
                groups={groups}
                teams={teams}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
            />
            <List
                activeUsers={activeUsers}
                activeChat={activeChat}
                defineActiveChat={defineActiveChat}
                setTeamActive={setTeamActive}
                activeTeam={activeTeam}
                allUsers={allUsers}
                getAllUserImportantConversations={getAllUserImportantConversations}
                getAllUserConversations={getAllUserConversations}
                getUsers={getUsers}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
                notifications={notifications}
                conversations={conversations}
            />
            <FriendInfo
                user={user}
                activeChat={activeChat}
            />
            {
                activeChat ?
                    <Chat
                        socket={socket}
                        updateMessages={updateMessages}
                        currentUser={user}
                        messages={messages}
                        activeChat={activeChat}
                    /> :
                    <div
                        className='alternative'
                    >
                        <p className='noConversation'>Open a conversation to start the chat</p>
                    </div>
            }

        </div>
    )
}

export default MessagePage;