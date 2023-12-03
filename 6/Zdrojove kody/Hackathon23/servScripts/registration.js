const fs = require('fs')

var path = __dirname.replace("servScripts", "")

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

function writeUser(userN, passW) {
    jsonUsers.users.push({
        name: userN,
        passw: passW,
    });

    fs.writeFileSync(path + 'servDB/users.json', JSON.stringify(jsonUsers)) // uncoment!!
}

module.exports.registration = (user, passw) => {
    fillUsers() // update users array 
    if (user == undefined | passw == undefined) {
        return { rgstr: false, msg: `username: ${user} is not possible, try another one` }
    }
    else if (usersArr.some((u) => u.name == user)) {
        return { rgstr: false, msg: `username: ${user} is taken, try another one` }
    }
    else {
        writeUser(user, passw)
        return { rgstr: true, msg: '' }
    }
}