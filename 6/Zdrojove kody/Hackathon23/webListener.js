const writeChats = require('./servScripts/writeChats.js')

const { WebSocketServer } = require('ws')
const sockserver = new WebSocketServer({ port: 42069 })

// const sendChat = require('./servScripts/sendChat.js') // create send chat script require

sockserver.on('connection', ws => {
    console.log('New client connected!')

    // ws.send(Buffer.from(JSON.stringify(sendChat.chats(name)))) // send chats to client
    ws.on('close', () => console.log('Client has disconnected!'))
    ws.on('message', data => {
        frnd = bin2String(data).split(':')[1]
        writeChats.write(data)
        sockserver.clients.forEach(client => {
            // console.log(`distributing message: ${data}`)
            client.send('none:none')
            client.send(bin2String(data).split(':')[0] + ':' + bin2String(data).split(':')[1])
        })
    })
    ws.onerror = function () {
        console.log('websocket error')
    }
})

function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}