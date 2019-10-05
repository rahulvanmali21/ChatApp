const { decryptInformation } = require("../helper/chatRoomCrypto");

module.exports={
    authorizedReader:(req,res,next)=>{
        const chatroomObject = JSON.parse(decryptInformation(req.params.chatroom));
        if(chatroomObject.friend_from == req.user.id || chatroomObject.friend_to == req.user.id){
           next();
        }else{
            return res.status(400);
        }
    }
}