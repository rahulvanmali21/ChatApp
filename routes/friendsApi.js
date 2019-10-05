const router = require("express").Router();
const connection = require("../config/connection");
const { encryptInformation } = require("../helper/chatRoomCrypto");

router.post("/test", (req, res) => {
    res.json("working")
})

// request for friendship 
router.post("/request", (req, res) => {
    // check if both are already Friends
    let sql = 'SELECT count(*) as count FROM friends WHERE friend_from =? AND friend_to=? ';
    let data = [req.user.id, req.body.id];

    connection.query({
        sql: sql,
        values: data
    }, (err, result) => {
        if (err) throw err;
        if (result[0].count === 0) {
            let chatroom_plainText = JSON.stringify(
                {
                    friend_from: parseInt(req.user.id),
                    friend_to: parseInt(req.body.id)
                }
            );
            let chat_room = encryptInformation(chatroom_plainText);
            let sql = 'INSERT INTO friends(friend_from,friend_to,status,chat_room) VALUES(?,?,?,?)';
            let data = [req.user.id, req.body.id, 'requested', chat_room];
            connection.query({
                sql: sql,
                values: data
            }, (err, result) => {
                if (err) throw err;
                return res.json({ requested: true });
            }
            ); // 2nd SQL query
        } else {
            return res.json({ requested: false });
        }
    }) // 1 SQL query 
});

// cancel friend request
router.delete("/request", (req, res) => {
    let sql = 'SELECT count(*) as count FROM friends WHERE friend_from =? AND friend_to=? AND status="requested"';
    let data = [req.user.id, req.body.id];
    connection.query({
        sql: sql,
        values: data
    }, (err, result) => {
        if (err) throw err;
        if (result[0].count !== 0) {
            sql = 'DELETE  FROM friends WHERE friend_from =? AND friend_to=? AND status="requested"';
            connection.query({
                sql: sql,
                values: data
            }, (err, result) => {
                if (err) throw err;
                return res.json({ canceled: true });
            }); // 2nd SQL query
        } else {
            return res.json({ canceled: false });
        }
    }); // 1st sQL query
});


// accept or reject friend request

router.put("/action", (req, res) => {
    const action = req.body.action;
    let sql = `SELECT id FROM friends WHERE friend_from=? AND friend_to=? `;
    let data = [req.body.user, req.user.id];
    connection.query({
        sql: sql,
        values: data
    }, (err, result) => {
        if (err) throw err;
        if (result[0].id && (action === "rejected" || action === "accepted")) {
            let friend_id = result[0].id;
            let sql = 'UPDATE friends SET status=? WHERE id=?';
            let data = [action, friend_id]
            connection.query({
                sql: sql,
                values: data
            }, (err, result) => {
                if (err) throw err;
                return res.json({ action: true });
            }) //2nd SQL query
        } else {
            return res.json({ action: false });
        }
    }); // 1st SQL query
});

// unfriend or remove from friendlist

router.delete("/remove", (req, res) => {
    let sql = 'SELECT count(*) as count FROM friends WHERE friend_from =? AND friend_to=? AND status="accepted"';
    let data = [req.user.id, req.body.id];
    connection.query({
        sql: sql,
        values: data
    }, (err, result) => {
        if (err) throw err;
        if (result[0].count !== 0) {
            sql = 'DELETE  FROM friends WHERE friend_from =? AND friend_to=? AND status="accepted"';
            connection.query({
                sql: sql,
                values: data
            }, (err, result) => {
                if (err) throw err;
                return res.json({ removed: true });
            })
        } else {
            return res.json({ removed: false });
        }
    })
});

// get all friend request

router.get("/requests", (req, res) => {
    const friend_to = req.user.id;
    let sql = `SELECT friend_from as user_id FROM friends WHERE friend_to =?`;
    let data = [friend_to];
    connection.query({
        sql: sql,
        values: data
    }, (err, result) => {
        if (err) throw err;
        if (result[0].user_id) {
            return res.json({ friendRequests: result });
        } else {
            return res.json({ friendRequests: null });
        }
    }); // 1st SQL query
});

// get count of  all friend request of user 

router.get("/request/count", (req, res) => {
    let sql = `SELECT count(*) as count FROM friends WHERE friend_to=? AND status='requested'`
    let data = [req.user.id];
    connection.query({
        sql: sql,
        values: data
    }, (err, result) => {
        if (err) throw err;
        if (result[0].count) {
            return res.json({
                count: result[0].count
            });
        } else {
            return res.json({
                count: false
            });
        }
    });
});


module.exports = router;