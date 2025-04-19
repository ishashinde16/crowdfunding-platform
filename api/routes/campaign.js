import express from "express"
import { add_campaign } from "../controllers/campaign.js"

const router = express.Router()

router.post("/add_campaign", add_campaign)

export default router