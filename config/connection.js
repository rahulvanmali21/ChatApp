const mysql = require("mysql")
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"chatDB"
});
connection.connect((err)=>{
    if(err){
        console.log(err)
    } else{
        console.log("\x1b[32m","database connected")
    }
    
});

module.exports = connection;