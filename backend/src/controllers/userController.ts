import { Request, Response } from "express";
import pool from "../config/db";
import { User } from "../types";
import { RowDataPacket } from "mysql2";

// @desc    Get all users
// @route   GET /api/users
// @access  Private
export const getUsers = async (req: Request, res: Response) => {
  try {
    const [users] = await pool.query<RowDataPacket[]>(
      "SELECT id, name, email FROM users"
    );
    res.json(users as User[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
