const router = require("express").Router();
const connection = require("../config/connection");
const { ensureAuthenticated } = require("../config/auth");
const { authorizedFriend } = require("../middlewares/authorizedFriend")

router.get("/:id",
    ensureAuthenticated,
    authorizedFriend,
    (req, res) => {
        let sql = "SELECT * FROM messages WHERE chat_room=? ORDER BY created_at DESC";
        const chat_room = req.token;
        let values = [req.token];
        connection.query({
            sql,
            values,
        }, (err, result) => {
            if (err) throw err;
            const messages = result.length > 0 ? result.slice() : null;
            sql = `SELECT users.id as id,users.username as username,users.email as email, 
            profile.picture as picture 
            FROM users 
                    INNER JOIN profile ON users.id = profile.user_id WHERE users.id = ?`;
            values = [req.params.id];
            connection.query({
                sql: sql,
                values: values
            }, (err, result_) => {
                if(err) throw err;
                const friend = result_[0];
                return res.render("chatroom", { messages,friend,chat_room });
            })
        }); // sql query
    });





module.exports = router;