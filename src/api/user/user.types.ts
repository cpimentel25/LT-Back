import { ObjectId } from "mongoose";

export type UserProfileType = {
  id: ObjectId;
  email: string;
  role: string;
  createdAt: Date;
};
