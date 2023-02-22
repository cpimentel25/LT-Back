import { Document, Schema, model } from "mongoose";

export interface CompanyDocument extends Document {
  name: string;
  address: string;
  NIT: string;
  phone: number;
  inventorys: string;
  createdAt: Date;
};

const CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    lowercase: true,
  },
  address: {
    type: String,
    required: [true, 'Please provide a address'],
    lowercase: true,
  },
  NIT: {
    type: String,
    required: [true, 'Please provide a NIT'],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: [true, 'Please provide a phone'],
    unique: true,
    lowercase: true,
  },
  inventorys: {
    type: Schema.Types.Array,
    ref: 'Inventory'
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Company = model<CompanyDocument>('Company', CompanySchema);

export default Company;
