import express from "express";
import { getAllDetails, addDetail } from "../controllers/feeds.js";



const router = express.Router();

router.get("", getAllDetails);
router.post("", addDetail);

export default router;