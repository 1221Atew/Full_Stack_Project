// product router here
import { Router} from "express";
import passport from "passport";

import {createProductCotroller, deleteProductCotroller, getOneProductCotroller, getProductsCotroller, updateProductCotroller} from "../controllers/products";

const router = Router();

router.get("/", getProductsCotroller)
router.get("/:productId", getOneProductCotroller)
router.post("/", createProductCotroller)
router.put("/:id",passport.authenticate("jwt", {session: false}), updateProductCotroller)
router.delete("/:id",passport.authenticate("jwt", {session: false}), deleteProductCotroller)

export default router;