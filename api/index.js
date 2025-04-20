import express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import campaignRoutes from "./routes/campaign.js"
import contributeRoutes from "./routes/contribute.js"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors()); 

app.use(express.json())
app.use(cookieParser())
app.use("/api/campaigns", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/campaign",campaignRoutes)
app.use("/api/contribute", contributeRoutes);

app.listen(8800, ()=>{
    console.log("Connected!")
})