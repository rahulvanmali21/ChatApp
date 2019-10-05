const router = require("express").Router()
const {ensureAuthenticated} = require("../config/auth");
router.get("/",(req,res)=>{
    if(req.user){
        return res.redirect("/home");
    }
    res.render("index")
});
router.get("/home",ensureAuthenticated,(req,res)=>{
    res.render("home")
});
router.get("/search",(req,res)=>{
    res.render("search")
});
module.exports = router;