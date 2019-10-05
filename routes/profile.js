const router = require("express").Router();
const multer = require('multer');
const connection = require("../config/connection");
const { ensureAuthenticated } = require("../config/auth");

const { check, validationResult } = require('express-validator');

router.get("/:username", ensureAuthenticated, (req, res) => {
    let isSameUser = req.user.username === req.params.username ? true : false;
    connection.query(`SELECT * FROM profile WHERE user_id=(
        SELECT id from users WHERE username = '${req.params.username}'
    )`,
        (err, result) => {
            const profile = result[0];
            if (isSameUser) {
                res.render("edit-profile", { profile });
            } else {
                connection.query(`SELECT id,username,email from users WHERE username = '${req.params.username}'`, (err, result_) => {
                    if (result_[0]) {
                        const user_ = result_[0];
                        let sql = 'SELECT COUNT(*) as count FROM friends WHERE status="accepted" AND (friend_from=? AND friend_to=?) OR (friend_from=? AND friend_to=?)';
                        let data = [user_.id, req.user.id, req.user.id, user_.id];
                        connection.query({
                            sql: sql,
                            values: data
                        }, (err, result) => {
                            if (err) throw err;
                            const isFriend = result[0].count > 0
                            res.render("show-profile", { profile: profile, user_: user_, isFriend: isFriend });
                        });
                    }
                }); // 2nd SQl query
            }
        }
    ); //1st SQL query
});


// storage setup
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'media/profile_pictures');
    },
    filename: (req, file, cb) => {
        cb(null, req.user.username + "-" + Date.now());
    }
});
//  image upload validation

// multer middleware
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024
    },

});


router.post("/:username",
    ensureAuthenticated,
    upload.single('profile_pic'),
    (req, res) => {
        const { status } = req.body || "";
        const imagePath = req.file.filename || "";
        connection.query(
            `UPDATE  profile SET 
            user_id=${req.user.id},
            status='${status}',
             ${
            imagePath != "" ? `picture='${imagePath}'` : ""
            }
             WHERE user_id = ${req.user.id} 
            `,
            (err) => {
                if (err) throw err;
                return res.redirect("/profile/" + req.params.username);
            }
        )
    });
module.exports = router;