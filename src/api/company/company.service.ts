import { DocumentDefinition } from "mongoose";
import Company, { CompanyDocument } from "./company.model";

export function getAllCompany(id: string) {
  return Company
    .find()
    .sort({ title: 1 })
};

export function getCompany(id: string) {
  return Company.findById(id)
};

export function createCompany(input: DocumentDefinition<CompanyDocument>) {
  return Company.create(input);
};

export function deleteCompany(id: string) {
  return Company.findByIdAndDelete(id);
};
