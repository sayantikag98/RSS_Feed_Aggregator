import express from "express";
import { getAllFeeds, addFeed, getFeed, updateFeed, deleteFeed } from "../controllers/feeds.js";
import { getAllFeedDetails, addFeedDetail, removeAllDetails } from "../controllers/feedDetails.js";



const router = express.Router();

router.route("/")
.get(getAllFeeds)
.post(addFeed);

router.route("/details")
.get(getAllFeedDetails)
.post(addFeedDetail);

router.route("/details/:id")
.delete(removeAllDetails);

router.route("/:id")
.get(getFeed)
.put(updateFeed)
.delete(deleteFeed);


export default router;