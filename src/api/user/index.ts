import { Router } from "express";
import { handleCreateUsers } from "./user.controller";

const router = Router();

// Post /api/users
router.post('/', handleCreateUsers);

export default router;
