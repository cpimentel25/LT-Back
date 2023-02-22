import { Request, Response } from "express";
import { createCompany, deleteCompany, getAllCompany, getCompany } from "./company.service";
import { AuthRequest } from "../../auth/auth.types";

export async function handleGetAllCompany(req: AuthRequest, res: Response) {
  const id = req.user?._id;
  try {
    const company = await getAllCompany(id);
    return res.status(200).json(company);
  } catch (error: any) {
    console.log('handleGetAllCompany ~ error', error)
    return res.status(500).json(error);
  }
};

export async function handleGetCompany(req: AuthRequest, res: Response) {
  const { id } = req.params;
  try {
    const company = await getCompany(id);
    return res.status(200).json(company);
  } catch (error: any) {
    console.log('handleGetCompany ~ error', error)
    return res.status(500).json(error);
  }
};

export async function handleCreateCompany(req: Request, res: Response) {
  const data = req.body;
  try {
    const user = await createCompany(data);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export async function handleDeleteCompany(req: AuthRequest, res: Response) {
  const { id } = req.params;
  try {
    const rosterDelete = await deleteCompany(id);
    res.status(200).json(rosterDelete);
  } catch (error) {
    console.log('handleDeleteCompany ~ error', error)
    return res.status(500).json(error);
  }
};
