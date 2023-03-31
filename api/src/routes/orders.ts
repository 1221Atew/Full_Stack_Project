import { Router} from "express";
import passport from "passport";

import {createOrderCotroller, deleteOrderCotroller, getOrdersCotroller, updateOrderCotroller} from "../controllers/orders";

const router = Router();

router.post("/:userId", passport.authenticate("jwt", {session: false}), createOrderCotroller)
router.get("/:userId", passport.authenticate("jwt", {session: false}),getOrdersCotroller)
router.put("/:id", passport.authenticate("jwt", {session: false}), updateOrderCotroller)
router.delete("/:id", passport.authenticate("jwt", {session: false}), deleteOrderCotroller)

export default router;