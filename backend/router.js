import { Router } from "express";
import * as user from "./requesthandler.js"
import Auth from "./middleware/auth.js"

const router=Router();

router.route("/signin").post(user.signIn);
router.route("/signup").post(user.signUp);
router.route('/home').get(Auth,user.home)
router.route('/nav').get(Auth,user.nav);
router.route('/listpeople').get(Auth,user.listpeople);
router.route('/chat/:rid').get(Auth,user.chat);
router.route("/addmessage/:rid").post(Auth,user.addMessage);
router.route('/profile').get(Auth,user.profile);
router.route('/editdetails').put(Auth,user.editDetails);
router.route("/forgotpassword").post(user.forgotPassword);
router.route("/changepassword").post(user.changePassword);
router.route("/deletemessage/:_id").delete(Auth,user.deleteMessage);





export default router;