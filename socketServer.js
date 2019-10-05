const socketIO = require("socket.io");
const connection = require("./config/connection");
let users = {};
module.exports = (server) => {
    let io = socketIO(server);
    io.on("connection", (socket) => {
        socket.on("joinRoom", (data) => {
            socket.room = data.room;
            socket.join(socket.room);
        });
        socket.on("typing",(data)=>{
            io.to(socket.room).emit("typing", data)
        });
        socket.on("online",(data)=>{
            // if(data.user)
            users[socket.id] = data.user_id
        });
        socket.on("not_typing",(data)=>{
            io.to(socket.room).emit("not_typing", data)
        });
        socket.on("chatMessage", (data) => {
            io.to(socket.room).emit("chatMessage", data)
            let sql = "INSERT INTO messages(chat_room,message_from,message_to,message_body,is_read,created_at) VALUES(?,?,?,?,?,?)";
            let values = [socket.room, data.sender, data.reciever, data.message, false,new Date()];
            connection.query({
                sql, values
            }, (err, result) => {
                if (err) throw err;
            });
        });
        socket.on("disconnect", () => {
            
            socket.leave(socket.room);

        });
    });
}
