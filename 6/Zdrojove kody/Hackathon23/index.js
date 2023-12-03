let logged = false // vasriable for loggin check // false is default
let lTry = 0 // loggin try number
let name = '' //name of logged user // '' is default 
let frnd = '' // friend name with who i am chatting now

// import some scripts
const checkLog = require('./servScripts/checkLog.js')
const registration = require('./servScripts/registration.js')
const writeChats = require('./servScripts/writeChats.js')

// import node modules
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express')
const { post } = require('jquery')
const app = express()

// set some settings for modules
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(express.static('public'))

// main page
app.get('/', (req, res) => {
    if (logged) {
        const posts = require('./servScripts/postFiles.js')
        const sendChat = require('./servScripts/sendChat.js')
        let data = {
            postName: posts.postName,
            user: name,
            users: sendChat.users()
        }
        res.render('index', data)
    }
    else {
        res.redirect('/login')
    }
})

app.post('/dopr', (req, res) => {
    res.send(req.body)
})

// chat page
app.get('/chat', (req, res) => {
    if (logged) {
        const sendChat = require('./servScripts/sendChat.js')
        
        let data = {
            WSport: '42069',
            user: name,
            frien: frnd,
            users: sendChat.users(),
            chats: sendChat.getChats(name)
        }
        res.render('chat', data)
    }
    else {
        res.redirect('/login')
    }
})
// send updated chats to client
app.get('/chats', (req,res) => {
    const sendChat = require('./servScripts/sendChat.js')

    let data = {
        chats: sendChat.getChats(name)
    }
    res.render(path.join(__dirname, '/views/chats.ejs'), data)
})


let Nmsg = ''
app.get('/login', (req, res) => {
    frnd = ''
    logged = false
    if (checkLog.isLogged(req.query.username, req.query.password)) {
        name = req.query.username
        logged = true
        lTry = 0
        res.redirect('/')
    }
    else {
        lTry++
        logged = false
        Nmsg = ''
        res.render('login', { page: 'Login', tryL: lTry, msG: Nmsg })
    }
})
app.get('/registration', (req, res) => {
    frnd = ''
    lTry = 0
    logged = false
    if (registration.registration(req.query.username, req.query.password)['rgstr']) {
        const createChats = require('./servScripts/createChats.js')
        createChats.createNewChats(req.query.username)
        name = req.query.username
        logged = true
        res.redirect('/')
    }
    else {
        Nmsg = registration.registration(req.query.username, req.query.password)['msg']
        res.render('login', { page: 'Registration', tryL: lTry, msG: Nmsg })
    }
})


// // webSocket
// const { WebSocketServer } = require('ws')
// const sockserver = new WebSocketServer({ port: 42069 })

// // const sendChat = require('./servScripts/sendChat.js') // create send chat script require

// sockserver.on('connection', ws => {
//     console.log('New client connected!')

//     // ws.send(Buffer.from(JSON.stringify(sendChat.chats(name)))) // send chats to client
//     ws.on('close', () => console.log('Client has disconnected!'))
//     ws.on('message', data => {
//         console.log(data)
//         sockserver.clients.forEach(client => {
//             // console.log(`distributing message: ${data}`)
//             frnd = bin2String(data).split(':')[1]
//             writeChats.write(data)
//         })
//     })
//     ws.onerror = function () {
//         console.log('websocket error')
//     }
// })
// // webSocket



function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}

const PORT = 6969
const HOST = '172.21.16.222'

app.listen(PORT, HOST, () => {
    console.log(`server is running: http://${HOST}:${PORT}`);
})

