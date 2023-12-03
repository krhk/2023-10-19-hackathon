const fs = require('fs')

const sendChat = require('./sendChat.js')
var path = __dirname.replace("servScripts", "")

module.exports.createNewChats = (userN) => {
    var chatsDb = fs.readFileSync(path + 'servDB/test.json') // chats.json is original
    var jsonChats = JSON.parse(chatsDb)

    usersArr = sendChat.users().split(',')

    let names = usersArr

    // add new user to all users chats
    jsonChats.chats.forEach(user => {
        user.msgs.push({
            [userN]: []
        })
    })

    // add users to new user's chat
    jsonChats.chats.push({
        user: userN,
        msgs: []
    })

    names.forEach(name => {
        jsonChats.chats[jsonChats.chats.length - 1].msgs.push({
            [name]: []
        })
    })



    fs.writeFileSync(path + 'servDB/test.json', JSON.stringify(jsonChats)) // chats.json is original
}

