const router = require("express").Router();
const connection = require("../config/connection");
const { ensureAuthenticated } = require("../config/auth");

router.get("/requests", ensureAuthenticated, (req, res) => {
    let userId = req.user.id;
    let sql = "SELECT friend_from as id FROM friends WHERE status='requested' AND friend_to=?";
    let values = [userId];
    connection.query({ sql, values }, (err, result) => {
        if (result.length > 0) {

            sql = "SELECT users.id as id,users.username as username,users.email as email, profile.picture as picture FROM users INNER JOIN profile ON users.id = profile.user_id WHERE users.id = ?";
            let users = [];
            Promise.all(result.map((user) => {
                let values = [user.id]
                let promise = new Promise((resolve, reject) => {
                    connection.query({ sql, values }, (err, result) => {
                        if (err) throw err;
                        resolve(result[0]);
                    });
                });
                return promise.then((result) => {
                    users.push(result)
                });
            })).then(() => {
                res.render("friendRequests", { users });
            });
        } else {
            res.render("friendRequests", { users: null });
        }
    });
});

router.get("/list", ensureAuthenticated, (req, res) => {
    let sql = "SELECT * FROM friends WHERE (friend_from =? OR friend_to =?) AND status='accepted'";
    let values = [req.user.id, req.user.id];
    connection.query({
        sql: sql,
        values: values
    }, (err, result) => {
        if (err) throw err;
        if (result.length > 0){
            sql = `SELECT users.id as id,users.username as username,users.email as email, 
                          profile.picture as picture 
                          FROM users 
                          INNER JOIN profile ON users.id = profile.user_id WHERE users.id = ?`;
            let friends =[];
            Promise.all(result.map((friend)=>{
                let friend_id  = friend.friend_from == req.user.id ? friend.friend_to : friend.friend_from; ;
                let values = [friend_id];
                let promise = new Promise((resolve,reject)=>{
                    connection.query({
                        sql:sql,
                        values:values
                    },(err,result_)=>{
                        if(err) throw err;
                        resolve(result_[0]);
                    })// getting friends details from user table
                });
                return promise.then((friend)=>{
                    friends.push(friend);
                });
            })).then(()=>{
                let count =friends.length;
                res.render("allFriends",{friends,count});
            });
        }else{
            let friends = null;
            res.render("allFriends",{friends});
        }
    })
});

module.exports = router;