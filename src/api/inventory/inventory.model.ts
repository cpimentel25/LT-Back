import { Document, ObjectId, Schema, model } from "mongoose";

export interface InventoryDocument extends Document {
  company: string;
  inventory: number;
  createdAt: Date;
  updateAt?: Date;
};

const InventorySchema = new Schema({
  company: {
    type: String,
    ref: 'Company',
  },
  inventory: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});


const Inventory = model<InventoryDocument>('Inventory', InventorySchema);

export default Inventory;
