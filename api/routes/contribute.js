import express from "express"
import { fetch_campaign, donate } from "../controllers/contribute.js"
const router = express.Router()

router.get("/:id", fetch_campaign);
router.post("/donate", donate);
export default router