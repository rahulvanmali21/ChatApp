let socket2 = io.connect(window.location.host);
let user_id = parseInt($("#user_nav").data("id"))
socket2.on("connection",()=>{
    socket2.emit("online",{user_id});
});