import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import router from "./routes/autentication.route.js";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor en puerto: http://localhost:${PORT}`);
});
