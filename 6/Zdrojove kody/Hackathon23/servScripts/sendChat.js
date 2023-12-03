const fs = require('fs')

var path = __dirname.replace("servScripts", "")

// users array
var usersDb = fs.readFileSync(path + 'servDB/users.json')
var jsonUsers = JSON.parse(usersDb)

var usersArr = []

for (i in jsonUsers.users) {
    usersArr.push(jsonUsers.users[i])
}

function fillUsers() {

    path = __dirname.replace("servScripts", "")

    usersDb = fs.readFileSync(path + 'servDB/users.json')
    jsonUsers = JSON.parse(usersDb)

    usersArr = []

    for (i in jsonUsers.users) {
        usersArr.push(jsonUsers.users[i])
    }

}

module.exports.users = () => {
    fillUsers()

    let usersName = ''
    usersArr.forEach(usr => {
        usersName += usr.name + ','
    })
    usersName = usersName.slice(0, -1)

    return usersName
}
// users array


// chats array
var chatsDb = fs.readFileSync(path + 'servDB/test.json') // chats.json is original
var jsonChats = JSON.parse(chatsDb)

function readMsgs(name) {
    // name = 'admin' // remove after add login back!!

    chatsDb = fs.readFileSync(path + 'servDB/test.json') // chats.json is original
    jsonChats = JSON.parse(chatsDb)

    var userChats = ''

    jsonChats.chats.forEach(usr => {
        if(usr.user == name){
            let index = jsonChats.chats.indexOf(usr)
            let chats = jsonChats.chats[index].msgs
            
            chats.forEach(msgs => {
                userChats += JSON.stringify(msgs) + ','
            })            

            userChats = userChats.slice(0, -1)

            return userChats
        }
    })

    return userChats
}

module.exports.getChats = (usr) => {
    return readMsgs(usr)
}

// chats array