import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "./user.model";

export function createUser(
  input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updateAt'>>
) {
  return User.create(input);
};

export function getUser(filter: FilterQuery<UserDocument>) {
  const user = User.findOne(filter);
  return user;
};
