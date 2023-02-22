import { Router } from "express";
import { handleCreatePdf, handleCreatePdfById } from "./pdf.controllet";
import { isAuthenticated } from "../auth/auth.service";

const router = Router();

// Get /pdf
router.get('/', handleCreatePdf);

// Get /pdf/:id
router.get('/:id', handleCreatePdfById);

// router.get('/', (req: Request, res: Response) => {
//   res.json({ message: 'Pdf route work!' });
//   console.log('work console')
// });

export default router;
