import { NextFunction, Request, Response } from "express";
import { getUser } from "../../api/user/user.service";
import { singToken } from "../auth.service";


export async function handleLoginUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user = await getUser({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password ' });
    }

    const payload = user.profile;
    console.log(payload);

    // JWT -> Token
    const token = singToken(payload);

    return res.status(200).json({ profile: user.profile, token });

  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
