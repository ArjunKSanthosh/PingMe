import { Router } from "express";
import * as user from "./requesthandler.js"
import Auth from "./middleware/auth.js"

const router=Router();

router.route("/signin").post(user.signIn);
router.route("/signup").post(user.signUp);

export default router;