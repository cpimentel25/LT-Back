import { Response } from "express";
import { createInventory, findCompany, updateCompany } from "./inventory.service";

export async function handleCreateInventory(req: any, res: Response) {
  const data = req.body;

  try {
    const inventoryLive = findCompany(data);

    if (!inventoryLive) {
      console.log('Inventory not found');
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const inventory = await createInventory(data);
    const companyInventory = await updateCompany(data);
    return res.status(200).json(companyInventory);

  } catch (error: any) {
    console.log('handleCreateValue ~ error', error)
    return res.status(500).json(error.message);
  }
}
