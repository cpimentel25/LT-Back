import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest, Roles } from "./auth.types";
import { UserDocument } from "../api/user/user.model";
import { getUser } from "../api/user/user.service";
import * as dotenv from 'dotenv';

dotenv.config();

// const SECRET = 'IiA.YRbq<6r`j5lo=GGi9Ox.<&F:j5^yice;=q}xN!wpRJRJJHm&oqIb=N"Lksr'
const SECRET = process.env.TOKEN_SECRET as string

// singToken ->
export function singToken(payload: any, options?: any) {
  const token = jwt.sign(
    payload,
    SECRET,
    options
  );

  return token;
};

// verifyToken ->
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as UserDocument;
    return decoded;
  } catch (error) {
    return false;
  };
};

// isAuthenticated ->
export async function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  };

  const decoded = verifyToken(token) as UserDocument;

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  };

  const user = await getUser({ email: decoded.email });

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  };

  req.user = user;

  // console.log('user Authenticated: ', user);

  next();
  return true;
};

// hasRol -> CLOSURES
export function hasRole(allowRoles: Roles) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as UserDocument;

    if (!allowRoles.includes(role)) {
      return res.status(404).json({ message: 'Forbidden' });
    };

    next();
    return true;
  };
};
