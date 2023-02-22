import { DocumentDefinition } from "mongoose";
import Company from "../company/company.model";
import Inventory, { InventoryDocument } from "./inventory.model";

export function findCompany(
  data: DocumentDefinition<InventoryDocument>,
) {
  const query = {
    _id: data.company,
  }

  return Company.findOne(query);
};

export function createInventory(
  value: DocumentDefinition<Omit<InventoryDocument, | 'createdAt' | 'updateAt'>>
) {
  return Inventory.create(value);
};

export function updateCompany(
  data: DocumentDefinition<InventoryDocument>,
) {
  const query = {
    name: data.company,
  }

  const update = {
    $push: { inventorys: data.inventory }
  }

  return Company.findOneAndUpdate(query, update);
};
