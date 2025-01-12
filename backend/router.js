import { Router } from "express";
import * as user from "./requesthandler.js"
import Auth from "./middleware/auth.js"

const router=Router();

router.route("/signin").post(user.signIn);
router.route("/signup").post(user.signUp);
router.route('/home').get(Auth,user.home)
router.route('/nav').get(Auth,user.nav);
router.route('/listpeople').get(Auth,user.listpeople);



export default router;