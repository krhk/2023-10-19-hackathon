let data = JSON.parse(document.getElementById("data").text) // parse json from <script type='data'>


// this div for saving recieved user into div on hrml web, just for different things
let divToUser = document.getElementById('toUser')


// split data by ','
let users = data.users.split(',')
let user = data.user.split(',')
let frnd = data.frnd.split(',')
let port = data.port.split(',')
// change some ass shit to "
let chats = data.chats.replaceAll('&#34;', '"')
// fix string to parse to json
let jsonStrChats = '{"chats": [' + chats + ']}'
// parse string with chats to json
let chatsJson = JSON.parse(jsonStrChats).chats


// update DB
function fillAgain() {
    includeHTML()
    data = JSON.parse(document.getElementById("data").text) // parse json from <script type='data'>
    let chats = document.getElementById('chats').innerHTML

    // split data by ','
    users = data.users.split(',')
    user = data.user.split(',')
    // change some ass shit to "
    chats = chats.replaceAll('&#34;', '"')
    // fix string to parse to json
    jsonStrChats = '{"chats": [' + chats + ']}'
    // parse string with chats to json
    chatsJson = JSON.parse(jsonStrChats).chats
}



const index = users.indexOf(user[0]);
// delete current user from friend List

if(index != -1){
    users.splice(index, 1);
}
users.splice(users.length - 1, 1);
// console.log(user)
// console.log(index)
// console.log(users)

let startWith = frnd[0] == '' ? users[0] : frnd[0]

chat.querySelector(".chat-header").innerText = `Chat with ${startWith}`; // who write to who 
//  (user[0] for deafult)
chat.querySelector(".chat-header").value = startWith // set usr[0] like start user
divToUser.value = startWith // save resieved user to div value , user[0] like start user

// function to chose user writing to
function selectFriend(friendElement) {
    const chat = document.getElementById("chat");
    const friendName = friendElement.innerText;
    chat.querySelector(".chat-header").innerText = `(${user}) Chat with ${friendName}`;
    chat.querySelector(".chat-header").value = friendName

    const userToDiv = document.getElementById('toUser')
    userToDiv.innerHTML = friendName
    divToUser.value = friendName

    showMsgs()
}


// div wich display friend list
let friendList = document.getElementById('friend-list')

// add friends to list, to div in html
users.forEach(usr => {
    let frndDom = document.createElement('li')
    frndDom.innerText = usr
    frndDom.className = "friend"
    frndDom.onclick = function () { selectFriend(frndDom) }
    friendList.append(frndDom)
});


let chatBox = document.getElementById('chat-messages') // declarate place to add msgs

// show messages on the page
function showMsgs() {

    chatBox.innerHTML = ''

    let userTo = divToUser.value // declarate variable with recieved user

    let currUsr = []

    chatsJson.forEach(user => {
        if (user[userTo] != undefined) {
            currUsr = user[userTo]
        }
    });

    currUsr.forEach(msg => {
        let messageDivIn = document.createElement('div') // div for message

        if (msg[0] == 1) {
            messageDivIn.className = 'sender'
        }
        else if (msg[0] == 2) {
            messageDivIn.className = 'receiver'
        }
        let messageDiv = document.createElement('div') // message div for line
        messageDiv.className = 'message' // set class for CSS

        messageDivIn.innerHTML = msg[1]

        messageDiv.appendChild(messageDivIn)

        chatBox.appendChild(messageDiv)
    })
}


showMsgs() // showing chats messages