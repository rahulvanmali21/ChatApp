const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const connection = require("./connection");
module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user.id)
    })
    passport.deserializeUser(function(id,done){
        connection.query(`SELECT * FROM users WHERE id=${id}`,(err,rows)=>{
            done(err,rows[0]);
        });
    });
    passport.use("local",
        new localStrategy(
            {usernameField:"email",passwordField:"password"},
            (email,password,done)=>{
                connection.query(`SELECT * FROM users WHERE email='${email}'`,(err,rows)=>{
                    if(err){
                        console.log(err)
                        return done(err)
                    }
                    if(!rows.length){
                        return done(null,false,{message:'Invalid email or password'});
                    }
                    bcrypt.compare(password,rows[0].password,(err,isMatch)=>{
                        if(err) throw err;
                        if(!isMatch){
                            return done(null,false,{message:'Invalid email or password'});
                        } else{
                            return done(null,rows[0]);
                        }
                    });
                });
            }
        )
    );
}