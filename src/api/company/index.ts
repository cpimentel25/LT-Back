import { Router } from "express";
import { handleCreateCompany, handleDeleteCompany, handleGetAllCompany, handleGetCompany } from "./company.controller";
import { hasRole, isAuthenticated } from "../../auth/auth.service";

const router = Router();

// Get /api/company
router.get('/', isAuthenticated, handleGetAllCompany);

// Get /api/company/:id
router.get('/:id', isAuthenticated, handleGetCompany);

// Post /api/company
router.post('/', isAuthenticated, hasRole(['ADMIN']), handleCreateCompany);

// Delete /api/company/:id
router.delete('/:id', isAuthenticated, handleDeleteCompany);

export default router;
