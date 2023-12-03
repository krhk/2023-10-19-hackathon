const fs = require('fs')

module.exports.isLogged = (user, passw) => {

    let path = __dirname.replace("servScripts", "")

    const usersDb = fs.readFileSync(path + 'servDB/users.json')
    const jsonUsers = JSON.parse(usersDb)

    let usersArr = []

    for (i in jsonUsers.users) {
        usersArr.push(jsonUsers.users[i])
    }

    if (usersArr.some((u) => u.name == user & u.passw == passw)) {
        return true
    }
    else {
        return false
    }
}