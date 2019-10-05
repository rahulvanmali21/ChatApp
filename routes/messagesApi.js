const router = require("express").Router();
const connection = require("../config/connection");
const { ensureAuthenticated } = require("../config/auth");
const { authorizedReader } = require("../middlewares/authorizedReader");
router.get("/:chatroom",
    ensureAuthenticated,
    authorizedReader,
    (req, res) => {
        const { chatroom } = req.params

        let sql = "SELECT message_from as sender,message_to as reciever,message_body as message,created_at as time FROM messages WHERE chat_room =? ORDER BY created_at ASC";
        let values = [chatroom];
        connection.query({
            sql,
            values
        }, (err, result) => {
            if (err) throw err;

            return res.json(result);
        })
    });


router.get("/",
    ensureAuthenticated,
    (req, res) => {
        let sql = `SELECT * FROM (SELECT * FROM messages ORDER BY id DESC) AS x WHERE message_from =? OR message_to=? GROUP BY chat_room`;
            sql = `SELECT * FROM messages WHERE (message_from=? OR message_to=?) AND id IN ( SELECT MAX(id) FROM messages GROUP BY chat_room )`
        let values = [req.user.id, req.user.id];
        connection.query({
            sql,
            values
        }, (err, result) => {
            if (err) throw err;
            sql = "SELECT users.id as id,users.username  as username,profile.picture as picture from users INNER JOIN profile ON users.id =profile.user_id WHERE users.id = ?"
            let messages = [];
            Promise.all(result.map(data => {
                let friendId = data.message_from == req.user.id ? data.message_to : data.message_from;
                values = [friendId];
                let promise = new Promise((resolve, reject) => {
                    connection.query({
                        sql, values
                    }, (err, result_) => {
                        if (err) throw err;
                        resolve(result_[0]);
                    })
                })
                return promise.then(friend => {
                    friend.picture = "/media/profile-picture/"+friend.picture+"/70/70" 
                    data.friend = friend;
                    messages.push(data);
                });
            })).then(() => {
                res.json(messages);
            })
        })
    });

module.exports = router;