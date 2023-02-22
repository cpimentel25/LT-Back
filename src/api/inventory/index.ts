import { Router } from "express";
import { hasRole, isAuthenticated } from "../../auth/auth.service";
import { handleCreateInventory } from "./inventory.controller";

const router = Router();

// Post /api/inventory
router.post('/', isAuthenticated, handleCreateInventory)

export default router;
