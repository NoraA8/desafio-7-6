import { Router } from "express";
import { autenticationController } from "../controllers/autentication.controller.js";
import { autenticationMiddlewares } from "../middlewares/verifyJWT.js";

const router = Router();

router.post("/usuarios", autenticationController.createUser);
router.post(
  "/login",
  autenticationMiddlewares.verificationUser,
  autenticationController.loginUser
);
router.get(
  "/usuarios",
  autenticationMiddlewares.verificationToken,
  autenticationController.getUsersInfo
);
router.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe");
});

export default router;
