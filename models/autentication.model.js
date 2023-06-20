import * as dotenv from "dotenv";
dotenv.config();
import { pool } from "../database/conection.js";
import bcrypt from "bcryptjs";

const create = async (email, password, rol, lenguage) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const query =
      "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)";
    await pool.query(query, [email, hashedPassword, rol, lenguage]);
  } catch (error) {
    throw error;
  }
};

const getUser = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows, rowCount } = await pool.query(query, [email]);
    if (rowCount === 0) throw new Error("Usuario no existe");
    return rows;
  } catch (error) {
    throw error;
  }
};

const getInfo = async (email) => {
  try {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(query, [email]);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const autenticationModel = {
  create,
  getUser,
  getInfo,
};
