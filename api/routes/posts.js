import express from "express";
import { getCampaigns } from "../controllers/post.js";

const router = express.Router();

router.get("/", getCampaigns);

export default router;
