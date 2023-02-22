import { Request, Response } from "express";
import { createUser } from "./user.service";

export async function handleCreateUsers(req: Request, res: Response) {
  const data = req.body;
  try {
    const user = await createUser(data);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
