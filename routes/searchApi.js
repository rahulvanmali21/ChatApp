const router = require("express").Router();
const connection = require("../config/connection");

router.get("/:username",(req,res)=>{
    let searchInput = req.params.username;
    let sql = `SELECT users.id,users.username,users.email,profile.picture,profile.status FROM users
                JOIN profile ON users.id = profile.user_id
                WHERE username LIKE '${searchInput}%' `
    connection.query({
        sql:sql,
    },(err,result)=>{
        if (err) throw err;
        if(result && result.lenght !=0){
            res.json(result);
        }else{
            res.json(result);
        }
    })
});

module.exports = router;