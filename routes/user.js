const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const connection = require("../config/connection");
const passport = require("passport");

router.get("/login",(req,res)=>{
    if(req.user){
        return res.redirect("/home")
    }
    res.render("login")}
);
router.get("/register",(req,res)=> {
    if(req.user){
        return res.redirect("/home")
    }
    res.render("register")
});

router.post("/login",passport.authenticate("local",{
    failureRedirect:"/account/login",
    failureFlash:true
    }),(req,res)=>{
    res.redirect("/home")
    }
);

router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("error","you have logout");
    res.redirect("/account/login")
});
   
router.post("/register",
    [
        check('username',"name should be atleast 3 character").isLength({min:3}),
        check('email',"please enter a valid email").isEmail(),
        check('password',"password should be atleast 6 character").isLength({min:6}),
    ],
(req,res, next)=>{
    let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("register",{
                errorMessage:errors.array(),
                username:req.body.username,
                email:req.body.email
            });
        }

            const { email,password,username } =req.body;
            connection.query(`SELECT COUNT(*) AS emails FROM users WHERE email='${email}'`,(err,result,feilds)=>{
               if(result[0].emails > 0) {
                   return res.render("register",{errorMessage:[{msg:"email already registered"}]});
              }
              bcrypt.genSalt(10,(err,salt)=>{
                  bcrypt.hash(password,salt,(err,hash)=>{
                      connection.query(`INSERT INTO users(username,email,password) VALUES(
                          '${username}',
                          '${email}',
                          '${hash}'
                      )`,(err, result)=>{
                        connection.query(`INSERT INTO profile(user_id,online,picture) VALUES(
                            '${result.insertId}',
                            '${false}',
                            'default'
                        );`)
                        return res.redirect("/account/login")  
                      }); 
                  });
              });
            });
    });
module.exports = router;