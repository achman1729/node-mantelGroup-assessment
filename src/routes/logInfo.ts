import express from 'express';
import controller from '../controller/logInfo';
const router = express.Router();

router.get('/fileInfo', controller.getLogFileInfo)

export default router