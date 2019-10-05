let getRecentMessages = () => {
    return fetch("/messages/")
        .then(res => res.json());
}
getRecentMessages()
    .then(res => {
        if(res.length!=0){
            res.forEach(message => {
                $("#recent-messages").append(createMessage(message));
            });
        }else{
            $("#recent-messages").html("<h2>you have started any conversation</h2>")
        }
    });

let createMessage = (message) => {
     
    return  `<div  class="media p-0 ">
                <div class="media">
                <img src="${message.friend.picture}" width="70" height="70" class=" m-1 mr-3 rounded-circle" alt="...">
                <div class="media-body">
                   <a href="/messenger/${message.friend.id}"><h5 class="mt-0 align-middle">${message.friend.username}</h5></a>
                    <strong class="m-0  text-truncate">${message.message_body}</strong><br>
                    <small >${new Date(message.created_at).getHours() + ":" +new Date(message.created_at).getMinutes()}</small>
                    </div>
                </div>
            </div>`;
}