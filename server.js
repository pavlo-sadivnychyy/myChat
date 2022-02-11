const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const conversationRoute = require('./routes/conversation');
const messagesRoute = require('./routes/messages');
const mongoose = require('mongoose')
const teamsRoute = require('./routes/teams');
const groupsRoute = require('./routes/group');
const cors = require('cors')


const io = require('socket.io')(8000, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let actChat;
let activeUsers = []

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on('activeUser', (user) => {
        if(!activeUsers.includes(user._id)){
            activeUsers.push(user._id)
        }
        socket.emit('listOfActive', activeUsers)
        console.log(activeUsers)
    })

    socket.on('joinRoom', (activeChat) => {
        socket.join(activeChat)
        actChat = activeChat
    })

    socket.on('sendMessage', (data) => {
        if(actChat === data.conversationId){
            io.in(data.conversationId).emit('receiveMessage', data)
        }
        // else{
        //     socket.broadcast.to('ID').emit( 'send msg', {somedata : somedata_server}); /// important
        // }
    })

    socket.on('disconnect', () => {
        console.log(activeUsers)
    })
})


mongoose.connect('mongodb+srv://pavlosad:120798Pavlo@cluster0.yp6xw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const store = new session.MemoryStore();

const app = express();


app.use(session({
    secret: 'secret',
    resave: true,
    cookie: {maxAge: 60000},
    saveUninitialized: false,
    store
}));
app.use(cors())
app.use(function(req, res, next){

    next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/uploads',express.static('uploads'))

app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/conversations', conversationRoute);
app.use('/messages', messagesRoute);
app.use('/teams', teamsRoute);
app.use('/groups', groupsRoute);

app.listen(9000, (err) => {
    if(err){
        throw Error(err);
    }
});
