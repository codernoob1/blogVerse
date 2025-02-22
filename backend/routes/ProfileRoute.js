import express from "express";
import { getUser, updateProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id",verifyToken,getUser);
router.put("/:id",verifyToken,updateProfile)

export default router;