import {Router} from 'express';
import {ping} from "../controllers/index.contoller.js";

const router = Router();

router.get('/user', ping);

export default router;