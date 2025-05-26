import express from "express";
import { createsummary } from "../controllers/geminicontroller.js";
const router = express.Router();




router.post("/createsummary", createsummary);



export default router;
