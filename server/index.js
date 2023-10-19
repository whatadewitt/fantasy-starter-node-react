import express from "express";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import authRoutes from "./auth/index.js";
import apiRoutes from "./api/index.js";

import session from "cookie-session";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(helmet());
app.use(hpp());
app.use(cors({ optionsSuccessStatus: 200, credentials: true }));

app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7), // 1 week
  })
);

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("/", (_, res) => {
  return res.send("Yahoo! Node Fantasy Wrapper Starter App - Server");
});

const sslOptions = {
  key: fs.readFileSync("certs/domain.key"),
  cert: fs.readFileSync("certs/domain.crt"),
};

https.createServer(sslOptions, app).listen(port);
