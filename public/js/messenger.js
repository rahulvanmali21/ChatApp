let messageElement = (data) => {
    if (data.sender == document.getElementById("sender").value) {
        return `<div class="outgoing_msg">
                    <div class="sent_msg text-right">
                        <p>${data.message}</p>
                        <span class="time_date"> ${new Date(data.time).getHours() + ":" +new Date(data.time).getMinutes()} </span>
                    </div>
                </div>`
    } else {
        return `<div class="incoming_msg">
                    <div class="received_msg">
                        <div class="received_withd_msg">
                            <p>${data.message}</p>
                            <span class="time_date"> ${new Date(data.time).getHours() + ":" +new Date(data.time).getMinutes()}  </span>
                        </div>
                    </div>
                </div>`
    }

}
let chatRoom = document.getElementById("main-container").getAttribute("data-chatRoom");
let socket = io.connect(window.location.host);
let sender = document.getElementById("sender").value;
let reciever = document.getElementById("reciever").value;

socket.emit("joinRoom", { room: chatRoom })

let sendButton = document.querySelector("#sendMessageButton")
sendButton.addEventListener("click", () => {
    let inputElement = document.getElementById("messageBox");
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    socket.emit("chatMessage", { message: inputElement.value, sender: sender, reciever: reciever, time: new Date() });
    inputElement.value = '';
});
socket.on("chatMessage", (data) => {
    $("#inbox").append(messageElement(data));
    scrollDown();
});

let scrollDown = () => {
    var msgDiv = document.getElementById("inbox");
    msgDiv.scrollTop = msgDiv.scrollHeight
}

let loadUsersMessages = () => {
    let url = `../../messages/${chatRoom}`;
    fetch(url, {
        method: "GET",
    })
        .then(res => res.json())
        .then(res => {
            let chatHistory = res.map(message => {
                return messageElement(message);
            });
            $("#inbox").append(chatHistory);
            scrollDown();
        });
}
// load msg history
$(document).ready(() => {
    loadUsersMessages();
});

// typing 
let typing = false;
let typing_timeout = undefined;

let typingTimeout = () => {
    typing = false;
    socket.emit("not_typing", { sender });
}
$("#messageBox").keypress(() => {
    if (typing == false) {
        typing = true;
        socket.emit("typing", { sender });
        typing_timeout = setTimeout(typingTimeout, 2000);
    } else {
        clearTimeout(typing_timeout);
        typing_timeout = setTimeout(typingTimeout, 2000);
    }
});
socket.on("typing", (data) => {
    if (data.sender !== sender) {
        $("#connectionStatus").html("typing..");
    }
});
socket.on("not_typing", (data) => {
    if (data.sender !== sender) {
        $("#connectionStatus").html("online");
    }
});