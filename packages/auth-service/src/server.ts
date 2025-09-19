import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { Request, Response } from "express";

import { routerV1 } from "./routes/auth.routes";
import {
  notFoundMiddleware,
  errorMiddleware,
  rateLimiter,
} from "@blog-platform-micro-services/common";
import { MessageService } from "./di/container-resolver";

dotenv.config();

const app = express();
const allowedOrigins = process.env.CLIENT_ORIGINS;

app.use(helmet());
app.use("/api", rateLimiter);
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.json({ message: `message send from server ${process.env.PORT}` });
});

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api", routerV1);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

MessageService.connectProducer()
  .then(() => console.log("Producer connected."))
  .catch((err) => console.error(err));
MessageService.connectConsumer()
  .then(() => console.log("Consumer connected."))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
