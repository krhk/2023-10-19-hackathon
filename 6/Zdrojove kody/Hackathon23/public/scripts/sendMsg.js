
let userTo = divToUser.value // declarate variable with recieved user



// webSocket part
const webSocket = new WebSocket(`ws://172.21.16.222:${port}`);
// send message to server
function sendMessage(event) {
    fillAgain()
    showMsgs()

    userTo = divToUser.value

    var inputMessage = document.getElementById('message')
    webSocket.send(`${user}:${userTo}:${inputMessage.value}`) // change admin to curr user from script Json after

    addMsg(inputMessage.value) // add message to page 

    event.preventDefault();

    inputMessage.value = ""


}




webSocket.onmessage = (event) => {
    var blob = event.data.split(':')
    userTo = divToUser.value
    if (user != blob[0] & userTo == blob[0]) {
        fillAgain()
        showMsgs()
    }

};



document.getElementById('msg-form').addEventListener('submit', sendMessage); // include send to
//                                                                            server function

//webSocket

// add message to page
function addMsg(messg) {
    let messageDivIn = document.createElement('div') // div for message

    messageDivIn.className = 'sender'

    let messageDiv = document.createElement('div') // message div for line
    messageDiv.className = 'message' // set class for CSS

    messageDivIn.innerHTML = messg

    messageDiv.appendChild(messageDivIn)

    chatBox.appendChild(messageDiv)
}