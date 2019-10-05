const connection = require("../config/connection");
module.exports = {
    authorizedFriend: (req, res, next) => {
        let sql = `SELECT chat_room as token FROM friends WHERE (friend_from= ? AND friend_to=?) OR  (friend_to= ? AND friend_from=?) `;
        let values = [req.user.id, req.params.id, req.user.id, req.params.id];
        connection.query({
            sql: sql,
            values: values
        }, (err, result) => {
            if (err) throw err;
            if (result[0].token && result[0].token != "") {
                req.token = result[0].token;
                next();
            } else
                res.render("404")
        });
    } // authorizedFriend functiom
} // exports