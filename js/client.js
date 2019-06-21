let socket = new WebSocket("ws://localhost:8081");

const msgForm = document.getElementById('msgForm');
const msgText = document.getElementById('msgText');
const chatViewport = document.getElementById('chat');

socket.onmessage = function (event) {
    newMessage(JSON.parse(event.data));
};

msgForm.onsubmit = function (e) {
    e.preventDefault();
    let json = JSON.stringify({code:1, msg: msgText.value});
    socket.send(json);
    msgText.value = '';
};

function newMessage(data) {
    let code = data.code;
    let msg = data.msg;
    var messageElem = document.createElement('div');
    if(code == 0) {
        messageElem.classList.add('text-white-50');
        messageElem.classList.add('font-italic');
        messageElem.classList.add('small');
    }
    messageElem.classList.add('my-1');
    messageElem.appendChild(document.createTextNode(msg));
    chatViewport.appendChild(messageElem);
}