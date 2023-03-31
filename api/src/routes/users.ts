// user router here
import { Router} from "express";
import passport from "passport"

import {createUserCotroller, deleteUserCotroller, getUserCotroller, logInWithPassword, updateUserCotroller} from "../controllers/users";

const router = Router();

router.post("/", createUserCotroller)
router.post("/login", logInWithPassword)
router.get("/:userId",passport.authenticate("jwt", {session: false}), getUserCotroller)
router.put("/:userId",passport.authenticate("jwt", {session: false}), updateUserCotroller)
router.delete("/:userId",passport.authenticate("jwt", {session: false}), deleteUserCotroller)

export default router;
