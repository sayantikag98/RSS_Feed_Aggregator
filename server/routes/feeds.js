import express from "express";
import { getAllFeeds, addFeed, getFeed, updateFeed, deleteFeed } from "../controllers/feeds.js";



const router = express.Router();

router.get("/", getAllFeeds);
router.post("/", addFeed);
router.get("/:id", getFeed);
router.patch("/:id", updateFeed);
router.delete("/:id", deleteFeed);


export default router;