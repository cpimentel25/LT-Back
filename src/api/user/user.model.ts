import bcrypt from "bcryptjs";
import { Document, Schema, model } from "mongoose";
import { UserProfileType } from "./user.types";

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updateAt?: Date;

  profile: UserProfileType;
  comparePassword: (password: string) => Promise<boolean>;
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
}, {
  timestamps: true,
  versionKey: false,
});

async function save(this: UserDocument, next: Function) { // (1)
  const user = this;

  try {
    if (!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error) {
    next(error);
  }
};

// Middlewares
UserSchema.pre('save', save);
UserSchema.pre('update', save);

// Virtuals
UserSchema.virtual('profile').get(function profile(this: UserDocument) {
  const { id, email, role, createdAt } = this;
  return {
    id,
    email,
    role,
    createdAt
  };
});


// Methods
async function comparePassword(this: UserDocument, candidatePassword: string, next: Function) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
  } catch (error) {
    next(error);
    return false;
  }
};

UserSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>('User', UserSchema);

export default User;
