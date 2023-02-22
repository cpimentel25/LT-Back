import { Router, Request, Response } from "express";

const router = Router();

// GET /hc
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Your server is RUNNING!' });
});

export default router;
