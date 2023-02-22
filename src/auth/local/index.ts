import { Router } from "express";
import { handleLoginUser } from "./local.controller";

const router = Router();

// POST /auth/login
router.post('/login', handleLoginUser);

export default router;
