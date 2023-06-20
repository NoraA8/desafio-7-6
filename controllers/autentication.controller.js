import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import { autenticationModel } from "../models/autentication.model.js";
import { handleErrors } from "../database/errors.js";

const createUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;

  try {
    if (!email || !password || !rol || !lenguage){
      throw ({message: 'Todos los campos tienen que estar completos'});
    }

    autenticationModel.create(email, password, rol, lenguage);
    res.status(200).json({
      ok: true,
      msg: 'Usuario creado existosamente',
    });
  } catch (error) {
    console.error(error);
    const { status } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const email = req.email;
  try {
    // Generar jwt
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    const { status } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message: error.message });
  }
};

const getUsersInfo = async (req, res) => {
  try {
    const rows = await autenticationModel.getInfo(req.email);

    res.json({ rows });
  } catch (error) {
    console.error(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

export const autenticationController = {
  createUser,
  loginUser,
  getUsersInfo,
};
