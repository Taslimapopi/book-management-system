import { pool } from "../../config/db";
import type { IUser } from "./auth.interface";
import bcrypt from "bcryptjs";

const registerUserIntoDb = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `
        INSERT INTO users (name,email, password,role ) VALUES ($1,$2,$3,COALESCE($4,'user')) RETURNING *
        `,
      [name, email, hashPassword, role],
    );

    delete result.rows[0].password;
    return result.rows[0];
  } catch (err: any) {
    if (err.code === 23505) {
      throw new Error("duplicate email");
    }
    throw err;
  }
};

const logInUserDb = async (payload: { email: string; password: string }) => {
  try {
    const { email, password } = payload;
    const result = await pool.query(
      `
            SELECT FROM users WHERE email=$1
            `,
      [email],
    );

    if (result.rowCount === 0) {
      throw new Error("user not found");
    }
    const match = await bcrypt.compare(password, result.rows[0].password);

    if (!match) {
      throw new Error("invalid credential");
    }
    delete result.rows[0].password;
    return result.rows[0];
  } catch (error) {}
};

export const userService = {
  registerUserIntoDb,
  logInUserDb,
};
