const fs = require('fs')

var path = __dirname.replace("servScripts", "")

var chatsDb = fs.readFileSync(path + 'servDB/test.json') // chats.json is original
var jsonChats = JSON.parse(chatsDb)

let userF = '' // kdo pise
let userT = '' // komu pise
let msg = '' //zprava


function fillAgain() {
    chatsDb = fs.readFileSync(path + 'servDB/test.json') // chats.json is original
    jsonChats = JSON.parse(chatsDb)
}

module.exports.write = (data) => {
    fillAgain()
    let arrData = bin2String(data).split(':')

    userF = arrData[0]
    userT = arrData[1]
    msg = arrData[2]

    witeJson(arrData[2])

    // jsonChats.users.push({
    //     name: userN,
    //     passw: passW,
    // });

    // fs.writeFileSync(path + 'servDB/users.json', JSON.stringify(jsonUsers))

}



function witeJson(message) {
    // console.log(jsonChats.chats[0].user)

    // for write message for Sender
    writeSender(message)
    // for write message for Sender

    // for write message for Reciever
    writeReceiver(message)
    // for write message for Reciever
}

function writeSender(message) {
    let indexUserF = 0
    let indexUserT = 0

    let currCht = {
        msgs: []
    };
    let currMsg = [];

    jsonChats.chats.forEach(chat => {
        if (chat.user == userF) {
            currCht = chat
            indexUserF = jsonChats.chats.indexOf(chat)
        }
    });

    currCht.msgs.forEach(msg => {
        if (msg[userT] != undefined) {
            currMsg = msg[userT]
            indexUserT = currCht.msgs.indexOf(msg)
        }
    })

    jsonChats.chats[indexUserF].msgs[indexUserT][userT].push([1, message]);

    // console.log(jsonChats.chats[indexUserF].msgs[indexUserT][userT])

    fs.writeFileSync(path + 'servDB/test.json', JSON.stringify(jsonChats)) // chats.json is original
}

function writeReceiver(message) {
    let indexUserF = 0
    let indexUserT = 0

    let currCht = {
        msgs: []
    };
    let currMsg = [];

    jsonChats.chats.forEach(chat => {
        if (chat.user == userT) {
            currCht = chat
            indexUserF = jsonChats.chats.indexOf(chat)
        }
    });

    currCht.msgs.forEach(msg => {
        if (msg[userF] != undefined) {
            currMsg = msg[userF]
            indexUserT = currCht.msgs.indexOf(msg)
        }
    })

    jsonChats.chats[indexUserF].msgs[indexUserT][userF].push([2, message]);

    fs.writeFileSync(path + 'servDB/test.json', JSON.stringify(jsonChats)) // chats.json is original
}

function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}