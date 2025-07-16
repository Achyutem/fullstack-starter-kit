import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { DecodedToken, User } from "../types";
import { RowDataPacket } from "mysql2";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;

      // Get user from the token (excluding password)
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, name, email FROM users WHERE id = ?",
        [decoded.id]
      );

      if (rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      req.user = rows[0] as User;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
