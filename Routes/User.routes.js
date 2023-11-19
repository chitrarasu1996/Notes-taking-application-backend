const express=require("express")
const { registerUser, allUsers, login, getUserNameById } = require("../controller/User.controller")
const { route } = require("./Notes.routes")
const router=express.Router()
router.post("/register-user",registerUser)
router.get("/get-allUsers",allUsers)
router.post("/login-user",login)
router.get("/getUserName",getUserNameById)
module.exports=router