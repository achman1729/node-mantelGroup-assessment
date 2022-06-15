import express from "express";
import getLogFileInfo from "../controller";
const router = express.Router();

router.get("/fileInfo", getLogFileInfo);

export default router;
