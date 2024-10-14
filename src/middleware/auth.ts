import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "config";

export interface CustomRequest extends Request {
  token: {
    userId: string;
  };
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);

    if (!token) {
      throw new Error();
    }
    const key: string = config.get("accessTokenSecret");
    const decoded = jwt.verify(token, key) as JwtPayload;
    (req as CustomRequest).token = {
      userId: decoded.userKey as string,
    };

    next();
  } catch (err) {
    res.status(401).send("Authentication failed");
  }
};
